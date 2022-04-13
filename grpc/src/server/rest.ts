import fetch from 'node-fetch';
import * as jwt from 'jsonwebtoken';
import md5 from 'md5';
import {Document} from '../proto/google/firestore/v1/document_pb';
import {google} from '../proto/document';
import { right, left, Either, isRight } from "fp-ts/lib/Either"
import { v4 as uuidv4 } from 'uuid';
const FirestoreDocument = google.firestore.v1.Document;
const FirestoreValue = google.firestore.v1.Value;

const matchDocumentNameRE = new RegExp('projects\/([^\/]+)\/databases\/([^\/]+)\/documents\/([^\/]+)\/(.+)');
import { StructuredQuery } from '../proto/google/firestore/v1/query_pb';
import { DocumentMask } from 'src/proto/google/firestore/v1/common_pb';

type Filter = {get: string; getHash: string; f: string; v: any; o: string; n: boolean}
type FilterAggregate = {get: string; getHash: string; filters: Filter[]};
export type Request = {id: string; hash: string};
export type LiveResponse = {
    document: Document | void;
    documents: Document[] | void;
    request: Request;
};
export type LiveCallbackFn = void | ((response: LiveResponse) => void);

const baseUri = process.env.GRPC_REST_ENDPOINT;
const projectId = process.env.GRPC_PROJECT_ID;
const databaseName = process.env.GRPC_DATABASE_NAME;
const jwtSecret = process.env.GRPC_JWT_SECRET;
const liveQueryInterval = parseInt(process.env.GRPC_LIVE_UPDATE_INTERVAL);


/**
 * request we need to generate
 * curl -d '[{"id": "f816c773-cc2d-44b7-8973-6a2bbd529c4e","hash": null,"jwt.claims": {"role":"webuser", "user_id":1},"headers": {},"cookies": {},"get": [{"f":"id", "v":3, "o":"gt", "n":false}]}]}]' 
 * -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2VidXNlciIsImFsbG93X2xpdmUiOnRydWV9.snctX_DP_k5IeuLRMD3wwmN1GhYCHRYKcPXm_MFCWtQ" 
 * -H "Content-Type: application/json" 
 * -i -X POST --insecure "https://localhost:4000/live/projects?id=gt.1"
 * live_request structure
 * {
 *      "a95c530a7af5f492a74499e70578d150":{ -- request hash
 *          "intervalId": null
 *          "uri": "/projects?id=gt.1" -- the exact url is that of the first connection
 *          "connections": {
 *              "f816c773-cc2d-44b7-8973-6a2bbd529c4e": {
 *                  "hash": null,
 *                   "jwt.claims": {"role":"webuser", "user_id":1},
 *                   "headers": {},
 *                   "cookies": {},
 *                   "get": [{"f":"id", "v":3, "o":"gt", "n":false}]
 *                   "callback": fn(..)
 *              }
 *          }
 *      }
 * }
 */
const live_requests = new Map();


export class RestError extends Error {
    code;
    error;
    constructor(code: number, error: any) {
        super(error.message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RestError.prototype);
        this.code = code;
        this.error = error;
    }
}

function type(obj): string {
    if (obj == null) { return (obj + '').toLowerCase(); } // implicit toString() conversion
    const deepType = Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
    let t = deepType.match(/^(array|bigint|date|error|function|generator|regexp|symbol)$/) ? deepType :
       (typeof obj === 'object' || typeof obj === 'function') ? 'object' : typeof obj;
    if (t === 'number') {
        t = Number.isInteger(obj) ? 'integer':'float';
    }
    return t;
}

function getValue(v: any): any{
    const vType = Object.keys(v)[0];
    return v[vType];
    // switch(vType){
    //     case 'nullValue':
    //         return v[vType];
    //     case 'booleanValue':
    //         return v[vType];
    //     case 'integerValue':
    //         return v[vType];
    //     case 'doubleValue':
    //         return v[vType];
    //     case 'timestampValue':
    //         return v[vType];
    //     case 'stringValue':
    //         return v[vType];
    //     case 'bytesValue':
    //         return v[vType];
    //     case 'referenceValue':
    //         return v[vType];
    //     case 'geoPointValue':
    //         return v[vType];
    //     case 'arrayValue':
    //         return v[vType];
    //     case 'mapValue':
    //         return v[vType];
    // }
}

function getOperator(op: StructuredQuery.FieldFilter.Operator): string {
    const Operator = StructuredQuery.FieldFilter.Operator;
    switch (op) {
        case Operator.ARRAY_CONTAINS: return 'cs';
        case Operator.ARRAY_CONTAINS_ANY: return 'ov';
        case Operator.EQUAL: return 'eq';
        case Operator.GREATER_THAN: return 'gt';
        case Operator.GREATER_THAN_OR_EQUAL: return 'gte';
        case Operator.IN: return 'in';
        case Operator.LESS_THAN: return 'lt';
        case Operator.LESS_THAN_OR_EQUAL: return 'lte';
        case Operator.NOT_IN: return 'not.in';
        case Operator.OPERATOR_UNSPECIFIED: return 'eq';
        default: return 'eq';
    }
}

function transformUnaryFilter(filter: StructuredQuery.UnaryFilter): Filter {
    const Operator = StructuredQuery.UnaryFilter.Operator;
    const _op = filter.getOp();
    const field = filter.getField().getFieldPath();
    let value = 'null';
    const op = 'is';
    let n = false;
    let nn = '';
    switch(_op){
        case Operator.IS_NAN:  break; //TODO! fix
        case Operator.IS_NOT_NAN:  break; //TODO! fix
        case Operator.IS_NOT_NULL: n=true; nn='not.'; break; //'not.is.null'
        case Operator.IS_NULL:  break; //'is.null
        case Operator.OPERATOR_UNSPECIFIED: value=''; break;
        default: value=''; break;
    }
    return { get: `${field}=${nn}${op}.${value}`, getHash: `${field}=${nn}${op}.${value}`, f: field, v: value, o: op, n: n};
}

function transformFieldFilter(filter: StructuredQuery.FieldFilter): Filter {
    const field = filter.getField().getFieldPath();
    const valueObj = FirestoreValue.toObject(FirestoreValue.decode(filter.getValue().serializeBinary()));
    let value = getValue(valueObj);
    const op = getOperator(filter.getOp());
    if(type(value) === 'array'){
        value = value.map(v => v.replaceAll('"', '\\"'))
    }
    if( op === 'in' || op === 'not.in' ){
        value = '("' + value.join('","') +'")'
    }
    if( op === 'cs' || op === 'ov' ){
        value = '{"' + value.join('","') +'"}'
    }
    return { get: `${field}=${op}.${value}`, getHash: `${field}=${op}`, f: field, v: value, o: op, n: false};
}

function transformCompositeFilter(filter: StructuredQuery.CompositeFilter): FilterAggregate {
    //const op = filter.getOp();
    const filters = filter.getFiltersList();
    const transformed: FilterAggregate[] =  filters.map(f => {
        let ff: Filter;
        switch(f.getFilterTypeCase()){
            case StructuredQuery.Filter.FilterTypeCase.FIELD_FILTER: 
                ff = transformFieldFilter(f.getFieldFilter());
                return {get: ff.get, getHash: ff.getHash, filters: [{f: ff.f, v: ff.v, o: ff.o, n: ff.n}]} as FilterAggregate;
            case StructuredQuery.Filter.FilterTypeCase.UNARY_FILTER:
                ff = transformUnaryFilter(f.getUnaryFilter());
                return {get: ff.get, getHash: ff.getHash, filters: [{f: ff.f, v: ff.v, o: ff.o, n: ff.n}]} as FilterAggregate
            case StructuredQuery.Filter.FilterTypeCase.COMPOSITE_FILTER:
                return transformCompositeFilter(f.getCompositeFilter()); //TODO! fix
            default:
                return  {get: 'unknwon', getHash: '', filters: [{f: '', v: '', o: '', n: false}]} as FilterAggregate; 
        }
    }).filter(({get}) => get !== 'unknown');
    const get = transformed.map( ({get}) => get ).join('&');
    const getHash = transformed.map( ({getHash}) => getHash ).join('&');
    const flts = [].concat( ... transformed.map( ({filters}) => filters ));
    return {get: get, getHash: getHash, filters: flts};
}

function transformWhere(f: StructuredQuery.Filter): FilterAggregate {
    let ff: Filter;
    if(!f) {
        return {get: '', getHash: '', filters: []} as FilterAggregate;
    }
    switch(f.getFilterTypeCase()) {
        case StructuredQuery.Filter.FilterTypeCase.FIELD_FILTER: {
            ff = transformFieldFilter(f.getFieldFilter());
            return {get: ff.get, getHash: ff.getHash, filters: [{f: ff.f, v: ff.v, o: ff.o, n: ff.n}]} as FilterAggregate;
            break;
        }
        case StructuredQuery.Filter.FilterTypeCase.COMPOSITE_FILTER: {
            return transformCompositeFilter(f.getCompositeFilter());
            break;
        }
        case StructuredQuery.Filter.FilterTypeCase.UNARY_FILTER: {
            ff = transformUnaryFilter(f.getUnaryFilter());
            return {get: ff.get, getHash: ff.getHash, filters: [{f: ff.f, v: ff.v, o: ff.o, n: ff.n}]} as FilterAggregate
            break;
        }
        case StructuredQuery.Filter.FilterTypeCase.FILTER_TYPE_NOT_SET: {
            break;
        }
    }
}

function transformOrder(order: StructuredQuery.Order[]): string {
    return order.filter(o => o.getField().getFieldPath() != '__name__').map(o => {
        const field = o.getField().getFieldPath();
        const directionId = o.getDirection();
        let direction = '';
        switch (directionId) {
            case StructuredQuery.Direction.ASCENDING:
                direction = 'asc';
                break;
            case StructuredQuery.Direction.DESCENDING:
                direction = 'desc';
                break;
            case StructuredQuery.Direction.DIRECTION_UNSPECIFIED:
                direction = 'asc';
                break;
        }
        return `${field}.${direction}`;
    }).join(',');
}

function getDocumentLocation(name): any{
    const m = name.match( matchDocumentNameRE );
    if(m){
        return {
            projectId: m[1],
            databaseName: m[2],
            collectionName: m[3],
            documentId: m[4],
        }
    }
    
    return null;
}

function serializeDocument(document: Document): any {
    const documentObj = FirestoreDocument.toObject(FirestoreDocument.decode(document.serializeBinary()));
    /*
        {
        name: 'projects/test-34283/databases/(default)/documents/cities/LA',
        fields: { capital: { booleanValue: true }, state: { stringValue: 'NY' } },
        createTime: {
            seconds: Long { low: 1609152290, high: 0, unsigned: false },
            nanos: 173000000
        },
        updateTime: {
            seconds: Long { low: 1609152290, high: 0, unsigned: false },
            nanos: 173000000
        }
        }
     */
    const {documentId} = getDocumentLocation(document.getName()); 
    const obj = {id: documentId};
    const fields = documentObj.fields;
    Object.keys(fields).reduce( (acc, f) => {
        const v = fields[f];
        acc[f] = getValue(v);
        return acc;
    }, obj);

    //console.log('obj', obj)
    return obj;
}

function dateToTimestamp(d){
    return {
        seconds: {
            low: Math.floor(d.getTime() / 1000),
            high: 0,
            unsigned: false
        },
        nanos: d.getUTCMilliseconds() * 1000000
    }
}
function unserializeDocument(doc: any, projectId: string, databaseName: string, collectionName: string, fields: string[]): Document {
    const document: any = {};
    //console.log('unserializeDocument', doc.id)
    const returnFields = !(fields.length == 1 && fields[0] == '*') ? fields : Object.keys(doc);
    const documentId = doc.id;
    delete doc.id
    document.name = `projects/${projectId}/databases/${databaseName}/documents/${collectionName}/${documentId}`;
    let createTimeStr = null;
    if(doc.createTime && doc.createTime.length == 29 && doc.createTime.match(/\d{4}-\d{2}-\d{2}(\s|T)\d{2}:\d{2}:\d{2}\.\d{6}\+\d{2}/)){
        createTimeStr = doc.createTime +':00';
    }
    else if(doc.createTime && doc.createTime.length == 26 && doc.createTime.match(/\d{4}-\d{2}-\d{2}(\s|T)\d{2}:\d{2}:\d{2}\.\d{6}/)){
        createTimeStr = doc.createTime;
    }
    else {
        createTimeStr = '1970-01-01 00:00:01.000000'
    }
    document.createTime = dateToTimestamp(new Date(createTimeStr));

    let updateTimeStr = null;
    if(doc.updateTime && doc.updateTime.length == 29 && doc.updateTime.match(/\d{4}-\d{2}-\d{2}(\s|T)\d{2}:\d{2}:\d{2}\.\d{6}\+\d{2}/)){
        updateTimeStr = doc.updateTime +':00';
    }
    else if(doc.updateTime && doc.updateTime.length == 26 && doc.updateTime.match(/\d{4}-\d{2}-\d{2}(\s|T)\d{2}:\d{2}:\d{2}\.\d{6}/)){
        updateTimeStr = doc.updateTime;
    }
    else {
        updateTimeStr = (new Date()).toISOString().replace('T', ' ').replace('Z', '')+'000';
    }
    document.updateTime = dateToTimestamp(new Date(updateTimeStr));
    
    
    document.fields = returnFields.reduce( (acc, f) => {
        switch (type(doc[f])) {
            //unimplemented bytesValue referenceValue geoPointValue
            case 'null':
                acc[f] = {nullValue: doc[f]};
                break;
            case 'boolean':
                acc[f] = {booleanValue: doc[f]};
                break;
            case 'integer':
                acc[f] = {integerValue: doc[f]};
                break;
            case 'float':
            case 'bigint':
                acc[f] = {doubleValue: doc[f]};
                break;
            case 'string':
                if(doc[f].length == 29 && doc[f].match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{6}\+\d{2}/)){
                    acc[f] = dateToTimestamp(new Date(doc[f]+':00'))
                }
                else if( doc[f].length == 26 && doc[f].match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{6}/)){
                    acc[f] = dateToTimestamp(new Date(doc[f]))
                }
                else{
                    acc[f] = {stringValue: doc[f]};
                }
                break;
            case 'array':
                acc[f] = {arrayValue: doc[f]};
                break;
            case 'object':
                acc[f] = {mapValue: doc[f]};
                break;
            default:
                break;
        }
        return acc;
    }, {});
    //console.log(returnFields, doc, document, document.fields.updateTime);
    return Document.deserializeBinary(FirestoreDocument.encode(FirestoreDocument.fromObject(document)).finish());
}

async function restCall(uri: string, options: any, calculateHash: void | boolean): Promise<Either<RestError,any>> {
    console.log('restCall', uri, options);
    const response = await fetch( baseUri + uri, options);
    if(response.ok){
        if(calculateHash){
            const body = await response.text();
            return right({responseHash: md5(body), response: JSON.parse(body)});
        }
        else{
            return right(await response.json());
        }
        
    }
    else{
        const error = await response.json();
        return left(new RestError(response.status,error));
    }
    
}


async function runLiveQueries(requestHash: string) {
    const lr = live_requests.get(requestHash);
    //console.log('run live queries', requestHash);
    const uri = '/live' + lr.uri;
    const jwtToken = jwt.sign({ role: lr.role, "allow_live":true }, jwtSecret);
    const isSingle = lr.headers.hasOwnProperty('Accept') && lr.headers['Accept'] == 'application/vnd.pgrst.object+json';
    const connectionIds =[ ...lr.connections.keys() ];
    const connectionIdsBatches = [];
    const batchSize = 100;
    while (connectionIds.length > 0) {
        connectionIdsBatches.push(connectionIds.splice(0,batchSize));
    }
    const intervalBetweenBatches = Math.floor(liveQueryInterval / connectionIdsBatches.length);
    for (let index = 0; index < connectionIdsBatches.length; index++) {
        console.log(`preparing batch ${index} ${intervalBetweenBatches}`)
        const batchIds = connectionIdsBatches[index];
        const payload = batchIds.map( connectionId => {
            const c = lr.connections.get(connectionId)
            return {
                id: connectionId,
                hash: c.hash,
                'jwt.claims': c.jwt_claims,
                headers: c.headers,
                cookies: c.cookies,
                get: c.get
            }
        });
        
        setTimeout(async function(){
            console.log(`running batch ${index}`)
            const r = await restCall(uri, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {...lr.headers, ...{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                }}
            });
    
            if(isRight(r)){
                const response = r.right;
                console.log('live response', response);
                response.map(r =>{
                    const connection = lr.connections.get(r.id);
                    connection.hash = r.hash;
                    if(isSingle){
                        connection.callback({
                            document: unserializeDocument(JSON.parse(r.body), projectId, databaseName, lr.collectionName, lr.fields), 
                            request: {id: r.id, hash: requestHash}
                        });
                    }
                    else {
                        const documents = JSON.parse(r.body);
                        connection.callback({
                            documents: documents.map(documentObj => unserializeDocument(documentObj, projectId, databaseName, lr.collectionName, lr.fields)), 
                            request: {id: r.id, hash: requestHash}
                        });
                    }
                })
            }
            else{
                console.log('live error', r);
            }
        }, intervalBetweenBatches * (index + 1))
        
    }
}

function addLiveRequest(requestHash: string, id: string, uri: string, collectionName: string, fields: string[], headers: any, filters: Filter[], responseHash: string, callback: LiveCallbackFn){
    if(!live_requests.has(requestHash)){
        live_requests.set(requestHash, {
            intervalId: setInterval(function(){runLiveQueries(requestHash)}, liveQueryInterval), 
            uri: uri,
            role: 'anonymous', //TODO!! needs to come from the request jwt
            collectionName: collectionName,
            fields: fields,
            headers: headers, //!!! TODO, set here only "general headers"
            connections: new Map()
        });
    }
    live_requests.get(requestHash).connections.set(id, {
        hash: responseHash,
        jwt_claims: {"role":"webuser"},
        headers: headers,
        cookies: {},
        get: filters,
        callback: callback
    });
}

export async function query(query: StructuredQuery, callback: LiveCallbackFn): Promise<Either<RestError, {documents: Document[]; request: Request}>> {
    const projection = query.getSelect(),
          select = projection?projection.getFieldsList().map(f=>f.getFieldPath()):['*'],
          collectionName = query.getFromList()[0].getCollectionId(), //support only one,
          order = transformOrder(query.getOrderByList()),
          {get, getHash, filters} = transformWhere(query.getWhere()),
          where = get,
          whereNoParams = getHash,
          orderStr = order.length > 0 ? `&order=${order}`:'',
          whereStr = where.length > 0 ? `&${where}`:'',
          whereNoParamsStr = whereNoParams.length > 0 ? `&${whereNoParams}`:'',
          uri        = `/${collectionName}?select=${select.join(',')}${orderStr}${whereStr}`,
          uriForHash = `/${collectionName}?select=${select.join(',')}${orderStr}${whereNoParamsStr}`,
          requestHash = md5(uriForHash),
          calculateHash = !!callback,
          requestId = uuidv4();
    //console.log('uriForHash', uriForHash);
    const r = await restCall(uri, {
        method: 'GET',
    }, calculateHash);
    if(isRight(r)){
        const {responseHash, response} = calculateHash ? r.right : {responseHash: '', response: r.right};
        const documents = response;
        if(callback){
            addLiveRequest(requestHash, requestId, uri, collectionName, select, {}, filters, responseHash, callback);
        }
        return right({
            documents: documents.map(documentObj => unserializeDocument(documentObj, projectId, databaseName, collectionName, select)), 
            request: {id: requestId, hash: requestHash}
        });
    }
    else{
        return r;
    }
}

export async function get(documentName: string, fields: string[], callback: LiveCallbackFn): Promise<Either<RestError, {document: Document; request: Request}>> {
    const {collectionName, documentId} = getDocumentLocation(documentName),
          select = encodeURI(fields.join(',')),
          id = encodeURI(documentId),
          uri        = `/${collectionName}?select=${select}&id=eq.${id}`,
          uriForHash = `/${collectionName}?select=${select}&id=eq`,
          requestHash = md5(uriForHash),
          calculateHash = !!callback,
          headers = {
            'Accept': 'application/vnd.pgrst.object+json'
          },
          requestId = uuidv4();

    //console.log('uriForHash', uriForHash);
    const r = await restCall(uri, {
        method: 'GET',
        headers: headers
    }, calculateHash);
    if(isRight(r)){
        const {responseHash, response} = calculateHash ? r.right : {responseHash: '', response: r.right};
        const documentObj = response;
        const filters: Filter[] = [{get: '', getHash: '', f: 'id', v: id, o: 'eq', n: false}];
        if(callback){
            addLiveRequest(requestHash, requestId, uri, collectionName, fields, headers, filters, responseHash, callback);
        }
        return right({
            document: unserializeDocument(documentObj, projectId, databaseName, collectionName, fields), 
            request: {id: requestId, hash: requestHash}
        });
    }
    else {
        return r;
    }
}

export async function update(document: Document, mask: DocumentMask): Promise<Either<RestError, boolean>> {
    const {collectionName, documentId} = getDocumentLocation(document.getName());
    const updateFields = mask.getFieldPathsList();
    const id = encodeURI(documentId);
    const uri = `/${collectionName}?select=id&id=eq.${id}`
    const documentObj = serializeDocument(document);
    const body = updateFields.reduce((obj, key) => {
        obj[key] = documentObj[key];
        return obj;
    }, {});
    const response = await restCall(uri, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/vnd.pgrst.object+json',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
        }
    });
    if(isRight(response)){
        return right(true);
    }
    else {
        return response;
    }
}

export async function upsert(document: Document): Promise<Either<RestError, boolean>> {
    const {collectionName, documentId} = getDocumentLocation(document.getName());
    const id = encodeURI(documentId);
    const uri = `/${collectionName}?select=id&id=eq.${id}`
    const documentObj = serializeDocument(document);
    const body = documentObj;
    const response = await restCall(uri, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
        }
    });
    if(isRight(response)){
        return right(true);
    }
    else {
        return response;
    }
}

export async function insert(document: Document): Promise<Either<RestError, boolean>> {
    const {collectionName} = getDocumentLocation(document.getName());
    const uri = `/${collectionName}?select=id`
    const documentObj = serializeDocument(document);
    const body = documentObj;
    const response = await restCall(uri, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/vnd.pgrst.object+json',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
        }
    });
    if(isRight(response)){
        return right(true);
    }
    else {
        return response;
    }
}

export async function remove(documentName: string): Promise<Either<RestError, boolean>> {
    const {collectionName, documentId} = getDocumentLocation(documentName);
    const id = encodeURI(documentId);
    const uri = `/${collectionName}?select=id&id=eq.${id}`
    const response = await restCall(uri, {
        method: 'DELETE',
        headers: {
            'Prefer': 'return=representation',
        }
    });
    if(isRight(response)){
        return right(true);
    }
    else {
        return response;
    }
}

export async function cancelWatch( request: Request) {
    const {id, hash} = request;
    if(live_requests.has(hash)){
        const lr = live_requests.get(hash);
        lr.connections.delete(id);
        if ( lr.connections.size === 0 ) {
            clearInterval(lr.intervalId);
            live_requests.delete(hash);
        }
    }
}
