import * as grpc from '@grpc/grpc-js';
import { sendUnaryData } from '@grpc/grpc-js/build/src/server-call';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
// import { Song, Comment } from '../proto/songs_pb';
import {GetDocumentRequest, BatchGetDocumentsResponse, BatchGetDocumentsRequest, BeginTransactionRequest, BeginTransactionResponse, 
    CommitRequest, CommitResponse, CreateDocumentRequest, DeleteDocumentRequest, ListCollectionIdsRequest, ListCollectionIdsResponse, 
    ListDocumentsRequest, ListDocumentsResponse, ListenRequest, ListenResponse, RollbackRequest, RunQueryRequest, RunQueryResponse, 
    UpdateDocumentRequest, WriteRequest, WriteResponse, Target, TargetChange, PartitionQueryRequest, BatchWriteRequest, BatchWriteResponse,
    PartitionQueryResponse} from '../proto/google/firestore/v1/firestore_pb'
import {Document} from '../proto/google/firestore/v1/document_pb'
// import { ISongsServer, SongsService } from '../proto/songs_grpc_pb';
import { IFirestoreServer, FirestoreService} from '../proto/google/firestore/v1/firestore_grpc_pb';
// import getSong from './get-song';
// import addSong from './add-song';
// import getChat from './get-chat';
// import { addComment, registerListener } from './live-chat';
import { DocumentChange, DocumentDelete, Write, WriteResult } from '../proto/google/firestore/v1/write_pb';
// import {google} from '../proto/document';
// import { StructuredQuery } from '../proto/google/firestore/v1/query_pb';
// const projectId = 'test-34283';
// const databaseName = '(default)';
// const databaseNameRE = databaseName.replace(/([()])/g, "\\$1");
import * as db from './rest';
import { Either, isRight } from "fp-ts/lib/Either"
// import { insertAt } from 'fp-ts/lib/ReadonlyRecord';
class FirestoreServer implements IFirestoreServer {
//const Impl: IFirestoreServer = {
    [name: string]: grpc.UntypedHandleCall;

    getDocument(_call: grpc.ServerUnaryCall<GetDocumentRequest, Document>, callback: sendUnaryData<Document>): void {
        console.log(`${new Date().toISOString()}    getDocument`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "not implemented",
        });
    }
    listDocuments(_call: grpc.ServerUnaryCall<ListDocumentsRequest, ListDocumentsResponse>, callback: sendUnaryData<ListDocumentsResponse>): void {
        console.log(`${new Date().toISOString()}    listDocuments`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "not implemented",
        });
    }
    createDocument(_call: grpc.ServerUnaryCall<CreateDocumentRequest, Document>, callback: sendUnaryData<Document>): void {
        console.log(`${new Date().toISOString()}    createDocument`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "not implemented",
        });
    }
    updateDocument(_call: grpc.ServerUnaryCall<UpdateDocumentRequest, Document>, callback: sendUnaryData<Document>): void {
        console.log(`${new Date().toISOString()}    updateDocument`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "not implemented",
        });
    }
    deleteDocument(_call: grpc.ServerUnaryCall<DeleteDocumentRequest, Empty>, callback: sendUnaryData<Empty>): void {
        console.log(`${new Date().toISOString()}    deleteDocument`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "not implemented",
        });
    }
    async partitionQuery(_call: grpc.ServerUnaryCall<PartitionQueryRequest, PartitionQueryResponse>): Promise<void> {
        console.log(`${new Date().toISOString()}    partitionQuery`);
    }

    async batchWrite(_call: grpc.ServerUnaryCall<BatchWriteRequest, BatchWriteResponse>): Promise<void> {
        console.log(`${new Date().toISOString()}    batchWrite`);
    }
    
    listCollectionIds(_call: grpc.ServerUnaryCall<ListCollectionIdsRequest, ListCollectionIdsResponse>, callback: sendUnaryData<ListCollectionIdsResponse>): void {
        console.log(`${new Date().toISOString()}    listCollectionIds`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "not implemented",
        });
    }
    async runQuery(_call: grpc.ServerWritableStream<RunQueryRequest, RunQueryResponse>): Promise<void> {
        console.log(`${new Date().toISOString()}    runQuery`);
    }
    async batchGetDocuments(call: grpc.ServerWritableStream<BatchGetDocumentsRequest, BatchGetDocumentsResponse>): Promise<void> {
        console.log(`${new Date().toISOString()}    batchGetDocuments changed`);
        const request: BatchGetDocumentsRequest = call.request;
        //const database = request.getDatabase();
        const mask = request.getMask();
        const documents = request.getDocumentsList();
        const fields = mask?mask.getFieldPathsList():['*'];
        for (const documentName of documents){
            console.log(`${new Date().toISOString()}    batchGetDocuments ${documentName}`);
            const r = await db.get(documentName, fields);
            const response = new BatchGetDocumentsResponse();
            response.setReadTime( Timestamp.fromDate(new Date()) );
            if(isRight(r)){
                const {document} = r.right;
                response.setFound(document);
            }
            else{
                response.setMissing(documentName);
            }
            call.write(response);
        }
        call.end();
    }
    listen(call: grpc.ServerDuplexStream<ListenRequest, ListenResponse>): void {
        console.log(`${new Date().toISOString()}    listen`);
        const dbRequestWatch: Map <number, Map<string, db.Request>> = new Map();
        //^ this should be a map with targetId -> Request
        //console.log('metadata', call.metadata);
        call.on('data', async (request: ListenRequest) => {
            switch (request.getTargetChangeCase()) {
                case ListenRequest.TargetChangeCase.ADD_TARGET: {
                    const target = request.getAddTarget();
                    const targetId = target.getTargetId()
                    // signal the target has been added
                    call.write(new ListenResponse().setTargetChange(
                        new TargetChange()
                            .setTargetChangeType(TargetChange.TargetChangeType.ADD)
                            .setTargetIdsList([targetId])
                    ));

                    switch (target.getTargetTypeCase()){
                        case Target.TargetTypeCase.DOCUMENTS: {
                            const documents = target.getDocuments().getDocumentsList();
                            const callback = function(r: db.LiveResponse){ 
                                const {document} = r;
                                if(document){
                                    call.write(new ListenResponse().setDocumentChange(
                                        new DocumentChange()
                                            .setTargetIdsList([targetId])
                                            .setDocument(document)
                                    ));
                                    call.write(new ListenResponse().setTargetChange(
                                        new TargetChange()
                                            .setTargetChangeType(TargetChange.TargetChangeType.CURRENT)
                                            .setTargetIdsList([targetId])
                                            .setReadTime(Timestamp.fromDate(new Date()))
                                    ));
                                    call.write(new ListenResponse().setTargetChange(
                                        new TargetChange()
                                            .setTargetChangeType(TargetChange.TargetChangeType.NO_CHANGE)
                                            .setTargetIdsList([])
                                            .setReadTime(Timestamp.fromDate(new Date()))
                                    ));
                                }
                            }
                            dbRequestWatch.set(targetId, new Map());
                            const rqs = dbRequestWatch.get(targetId);
                            for (const documentName of documents) {
                                const response = await db.get(documentName, ['*'], callback);
                                if(isRight(response)){
                                    const {document, request} = response.right;
                                    rqs.set(request.id, request);
                                    call.write(new ListenResponse().setDocumentChange(
                                        new DocumentChange()
                                            .setTargetIdsList([targetId])
                                            .setDocument(document)
                                    ));
                                }
                                else {
                                    call.write(new ListenResponse().setDocumentDelete( 
                                        new DocumentDelete()
                                            .setDocument(documentName)
                                            .setRemovedTargetIdsList([targetId])
                                    ));
                                }
                            }
                            break;
                        }
                        case Target.TargetTypeCase.QUERY: {
                            const query = target.getQuery().getStructuredQuery();
                            const callback = function(r: db.LiveResponse){ 
                                const {documents, request} = r;
                                if(documents){
                                    call.write(new ListenResponse().setTargetChange(
                                        new TargetChange()
                                            .setTargetChangeType(TargetChange.TargetChangeType.RESET)
                                            .setTargetIdsList([targetId])
                                            .setReadTime(Timestamp.fromDate(new Date()))
                                    ));
                                    for (const document of documents){
                                        call.write(new ListenResponse().setDocumentChange(
                                            new DocumentChange()
                                                .setTargetIdsList([targetId])
                                                .setDocument(document)
                                        ));
                                    }
                                    call.write(new ListenResponse().setTargetChange(
                                        new TargetChange()
                                            .setTargetChangeType(TargetChange.TargetChangeType.CURRENT)
                                            .setTargetIdsList([targetId])
                                            .setReadTime(Timestamp.fromDate(new Date()))
                                    ));
                                    call.write(new ListenResponse().setTargetChange(
                                        new TargetChange()
                                            .setTargetChangeType(TargetChange.TargetChangeType.NO_CHANGE)
                                            .setTargetIdsList([])
                                            .setReadTime(Timestamp.fromDate(new Date()))
                                    ));
                                }
                             }
                            const response = await db.query(query, callback);
                            if(isRight(response)){
                                
                                const {documents, request} = response.right;
                                
                                dbRequestWatch.set(targetId, new Map());
                                const rqs = dbRequestWatch.get(targetId);
                                rqs.set(request.id, request);
                                for (const document of documents){
                                    //console.log('got right doc', document)
                                    call.write(new ListenResponse().setDocumentChange(
                                        new DocumentChange()
                                            .setTargetIdsList([targetId])
                                            .setDocument(document)
                                    ));
                                }
                            }
                            break;
                        }
                        case Target.TargetTypeCase.TARGET_TYPE_NOT_SET: {
                            break;
                        }
                    }

                    call.write(new ListenResponse().setTargetChange(
                        new TargetChange()
                            .setTargetChangeType(TargetChange.TargetChangeType.CURRENT)
                            .setTargetIdsList([targetId])
                            .setReadTime(Timestamp.fromDate(new Date()))
                    ));

                    call.write(new ListenResponse().setTargetChange(
                        new TargetChange()
                            .setTargetChangeType(TargetChange.TargetChangeType.NO_CHANGE)
                            .setTargetIdsList([])
                            .setReadTime(Timestamp.fromDate(new Date()))
                    ));

                    break;
                }
                case ListenRequest.TargetChangeCase.REMOVE_TARGET: {
                    //TODO!! remove from live watch
                    const targetId = request.getRemoveTarget();
                    const rqs = dbRequestWatch.get(targetId);
                    rqs.forEach(r => db.cancelWatch(r));
                    call.write(new ListenResponse().setTargetChange(
                        new TargetChange()
                            .setTargetChangeType(TargetChange.TargetChangeType.REMOVE)
                            .setTargetIdsList([targetId])
                    ));
                    break;
                }
                case ListenRequest.TargetChangeCase.TARGET_CHANGE_NOT_SET: {
                    break;
                }
            }
        });
        call.on('end', () => {
            dbRequestWatch.forEach(t => {
                t.forEach(r => db.cancelWatch(r));
            })
            call.end()
        });
    }

    //implemented
    
    write(call: grpc.ServerDuplexStream<WriteRequest, WriteResponse>): void {
        console.log(`${new Date().toISOString()}    write`);
        call.on('end', () => call.end());
        call.on('data', async (request: WriteRequest) => {
            //const database = request.getDatabase();
            const streamId = request.getStreamId();
            const writes   = request.getWritesList();
            const response = new WriteResponse();
            response.setStreamId(streamId);
            await performWrites(writes, response);
            response.setCommitTime( Timestamp.fromDate(new Date()));
            call.write(response);
        });
    }
    beginTransaction( call: grpc.ServerUnaryCall<BeginTransactionRequest, BeginTransactionResponse>, callback: sendUnaryData<BeginTransactionResponse>): void {
        console.log(`${new Date().toISOString()}    beginTransaction`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "beginTransaction is not implemented",
        });
    }

    async commit( call: grpc.ServerUnaryCall<CommitRequest, CommitResponse>, callback: sendUnaryData<CommitResponse>): Promise<void> {
        console.log(`${new Date().toISOString()}    commit`);
        const request = call.request;
        //const database = request.getDatabase();
        //const transaction = request.getTransaction();
        const writes   = request.getWritesList();
        const response = new CommitResponse();
        await performWrites(writes, response);
        response.setCommitTime( Timestamp.fromDate(new Date()));
        return callback(null, response);
    }
    rollback( call: grpc.ServerUnaryCall<RollbackRequest, any>, callback: sendUnaryData<any>): void {
        console.log(`${new Date().toISOString()}    rollback`);
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            message: "commit is not implemented",
        });
    }
}
async function performWrites(writes: Write[], response: any): Promise<void> {
    for (const write of writes){
        switch (write.getOperationCase()) {
            case Write.OperationCase.UPDATE: {
                const document = write.getUpdate();
                const mask = write.getUpdateMask();
                const currentDocument = write.getCurrentDocument();
                document.setCreateTime(Timestamp.fromDate(new Date()));
                document.setUpdateTime(Timestamp.fromDate(new Date()));
                let result: Either<db.RestError, any>;
                if(mask){ //update a few fields
                    result = await db.update(document, mask);
                }
                else { //update the entire doc
                    if(currentDocument && currentDocument.getExists()){
                        result = await db.insert(document);
                    }
                    else{
                        result = await db.upsert(document);
                    }
                }
                if(isRight(result)){
                    response.addWriteResults(new WriteResult().setTransformResultsList([]).setUpdateTime(Timestamp.fromDate(new Date())));
                }
                break;
            }
            case Write.OperationCase.DELETE: {
                const documentName = write.getDelete();
                const result = await db.remove(documentName);
                if(isRight(result)){
                    response.addWriteResults(new WriteResult().setTransformResultsList([]));
                }
                break;
            }
            case Write.OperationCase.TRANSFORM: {
                break;
            }
            // case Write.OperationCase.VERIFY: {
            //     break;
            // }
            case Write.OperationCase.OPERATION_NOT_SET: {
                break;
            }
        }
    }
}

function serve(): void {
    const server = new grpc.Server();
    
    server.addService(FirestoreService, new FirestoreServer());
    server.bindAsync(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            throw err;
        }
        console.log(`Listening on ${port}`);
        server.start();
    });
}

export default {
    command: 'serve',
    describe: 'Start the gRPC server',
    builder: {},
    handler: serve,
};
