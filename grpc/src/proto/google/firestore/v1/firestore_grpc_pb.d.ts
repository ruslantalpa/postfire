// package: google.firestore.v1
// file: google/firestore/v1/firestore.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as google_firestore_v1_firestore_pb from "../../../google/firestore/v1/firestore_pb";
import * as google_api_client_pb from "../../../google/api/client_pb";
import * as google_api_field_behavior_pb from "../../../google/api/field_behavior_pb";
import * as google_firestore_v1_common_pb from "../../../google/firestore/v1/common_pb";
import * as google_firestore_v1_document_pb from "../../../google/firestore/v1/document_pb";
import * as google_firestore_v1_query_pb from "../../../google/firestore/v1/query_pb";
import * as google_firestore_v1_write_pb from "../../../google/firestore/v1/write_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_rpc_status_pb from "../../../google/rpc/status_pb";

interface IFirestoreService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getDocument: IFirestoreService_IGetDocument;
    listDocuments: IFirestoreService_IListDocuments;
    updateDocument: IFirestoreService_IUpdateDocument;
    deleteDocument: IFirestoreService_IDeleteDocument;
    batchGetDocuments: IFirestoreService_IBatchGetDocuments;
    beginTransaction: IFirestoreService_IBeginTransaction;
    commit: IFirestoreService_ICommit;
    rollback: IFirestoreService_IRollback;
    runQuery: IFirestoreService_IRunQuery;
    partitionQuery: IFirestoreService_IPartitionQuery;
    write: IFirestoreService_IWrite;
    listen: IFirestoreService_IListen;
    listCollectionIds: IFirestoreService_IListCollectionIds;
    batchWrite: IFirestoreService_IBatchWrite;
    createDocument: IFirestoreService_ICreateDocument;
}

interface IFirestoreService_IGetDocument extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.GetDocumentRequest, google_firestore_v1_document_pb.Document> {
    path: "/google.firestore.v1.Firestore/GetDocument";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.GetDocumentRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.GetDocumentRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_document_pb.Document>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_document_pb.Document>;
}
interface IFirestoreService_IListDocuments extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.ListDocumentsRequest, google_firestore_v1_firestore_pb.ListDocumentsResponse> {
    path: "/google.firestore.v1.Firestore/ListDocuments";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.ListDocumentsRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.ListDocumentsRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.ListDocumentsResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.ListDocumentsResponse>;
}
interface IFirestoreService_IUpdateDocument extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.UpdateDocumentRequest, google_firestore_v1_document_pb.Document> {
    path: "/google.firestore.v1.Firestore/UpdateDocument";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.UpdateDocumentRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.UpdateDocumentRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_document_pb.Document>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_document_pb.Document>;
}
interface IFirestoreService_IDeleteDocument extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.DeleteDocumentRequest, google_protobuf_empty_pb.Empty> {
    path: "/google.firestore.v1.Firestore/DeleteDocument";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.DeleteDocumentRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.DeleteDocumentRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IFirestoreService_IBatchGetDocuments extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.BatchGetDocumentsRequest, google_firestore_v1_firestore_pb.BatchGetDocumentsResponse> {
    path: "/google.firestore.v1.Firestore/BatchGetDocuments";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.BatchGetDocumentsRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.BatchGetDocumentsRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.BatchGetDocumentsResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.BatchGetDocumentsResponse>;
}
interface IFirestoreService_IBeginTransaction extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.BeginTransactionRequest, google_firestore_v1_firestore_pb.BeginTransactionResponse> {
    path: "/google.firestore.v1.Firestore/BeginTransaction";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.BeginTransactionRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.BeginTransactionRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.BeginTransactionResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.BeginTransactionResponse>;
}
interface IFirestoreService_ICommit extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.CommitRequest, google_firestore_v1_firestore_pb.CommitResponse> {
    path: "/google.firestore.v1.Firestore/Commit";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.CommitRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.CommitRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.CommitResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.CommitResponse>;
}
interface IFirestoreService_IRollback extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.RollbackRequest, google_protobuf_empty_pb.Empty> {
    path: "/google.firestore.v1.Firestore/Rollback";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.RollbackRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.RollbackRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IFirestoreService_IRunQuery extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.RunQueryRequest, google_firestore_v1_firestore_pb.RunQueryResponse> {
    path: "/google.firestore.v1.Firestore/RunQuery";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.RunQueryRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.RunQueryRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.RunQueryResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.RunQueryResponse>;
}
interface IFirestoreService_IPartitionQuery extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.PartitionQueryRequest, google_firestore_v1_firestore_pb.PartitionQueryResponse> {
    path: "/google.firestore.v1.Firestore/PartitionQuery";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.PartitionQueryRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.PartitionQueryRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.PartitionQueryResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.PartitionQueryResponse>;
}
interface IFirestoreService_IWrite extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.WriteRequest, google_firestore_v1_firestore_pb.WriteResponse> {
    path: "/google.firestore.v1.Firestore/Write";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.WriteRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.WriteRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.WriteResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.WriteResponse>;
}
interface IFirestoreService_IListen extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.ListenRequest, google_firestore_v1_firestore_pb.ListenResponse> {
    path: "/google.firestore.v1.Firestore/Listen";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.ListenRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.ListenRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.ListenResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.ListenResponse>;
}
interface IFirestoreService_IListCollectionIds extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.ListCollectionIdsRequest, google_firestore_v1_firestore_pb.ListCollectionIdsResponse> {
    path: "/google.firestore.v1.Firestore/ListCollectionIds";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.ListCollectionIdsRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.ListCollectionIdsRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.ListCollectionIdsResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.ListCollectionIdsResponse>;
}
interface IFirestoreService_IBatchWrite extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.BatchWriteRequest, google_firestore_v1_firestore_pb.BatchWriteResponse> {
    path: "/google.firestore.v1.Firestore/BatchWrite";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.BatchWriteRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.BatchWriteRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_firestore_pb.BatchWriteResponse>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.BatchWriteResponse>;
}
interface IFirestoreService_ICreateDocument extends grpc.MethodDefinition<google_firestore_v1_firestore_pb.CreateDocumentRequest, google_firestore_v1_document_pb.Document> {
    path: "/google.firestore.v1.Firestore/CreateDocument";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_firestore_v1_firestore_pb.CreateDocumentRequest>;
    requestDeserialize: grpc.deserialize<google_firestore_v1_firestore_pb.CreateDocumentRequest>;
    responseSerialize: grpc.serialize<google_firestore_v1_document_pb.Document>;
    responseDeserialize: grpc.deserialize<google_firestore_v1_document_pb.Document>;
}

export const FirestoreService: IFirestoreService;

export interface IFirestoreServer extends grpc.UntypedServiceImplementation {
    getDocument: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.GetDocumentRequest, google_firestore_v1_document_pb.Document>;
    listDocuments: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.ListDocumentsRequest, google_firestore_v1_firestore_pb.ListDocumentsResponse>;
    updateDocument: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.UpdateDocumentRequest, google_firestore_v1_document_pb.Document>;
    deleteDocument: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.DeleteDocumentRequest, google_protobuf_empty_pb.Empty>;
    batchGetDocuments: grpc.handleServerStreamingCall<google_firestore_v1_firestore_pb.BatchGetDocumentsRequest, google_firestore_v1_firestore_pb.BatchGetDocumentsResponse>;
    beginTransaction: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.BeginTransactionRequest, google_firestore_v1_firestore_pb.BeginTransactionResponse>;
    commit: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.CommitRequest, google_firestore_v1_firestore_pb.CommitResponse>;
    rollback: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.RollbackRequest, google_protobuf_empty_pb.Empty>;
    runQuery: grpc.handleServerStreamingCall<google_firestore_v1_firestore_pb.RunQueryRequest, google_firestore_v1_firestore_pb.RunQueryResponse>;
    partitionQuery: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.PartitionQueryRequest, google_firestore_v1_firestore_pb.PartitionQueryResponse>;
    write: grpc.handleBidiStreamingCall<google_firestore_v1_firestore_pb.WriteRequest, google_firestore_v1_firestore_pb.WriteResponse>;
    listen: grpc.handleBidiStreamingCall<google_firestore_v1_firestore_pb.ListenRequest, google_firestore_v1_firestore_pb.ListenResponse>;
    listCollectionIds: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.ListCollectionIdsRequest, google_firestore_v1_firestore_pb.ListCollectionIdsResponse>;
    batchWrite: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.BatchWriteRequest, google_firestore_v1_firestore_pb.BatchWriteResponse>;
    createDocument: grpc.handleUnaryCall<google_firestore_v1_firestore_pb.CreateDocumentRequest, google_firestore_v1_document_pb.Document>;
}

export interface IFirestoreClient {
    getDocument(request: google_firestore_v1_firestore_pb.GetDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    getDocument(request: google_firestore_v1_firestore_pb.GetDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    getDocument(request: google_firestore_v1_firestore_pb.GetDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    listDocuments(request: google_firestore_v1_firestore_pb.ListDocumentsRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListDocumentsResponse) => void): grpc.ClientUnaryCall;
    listDocuments(request: google_firestore_v1_firestore_pb.ListDocumentsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListDocumentsResponse) => void): grpc.ClientUnaryCall;
    listDocuments(request: google_firestore_v1_firestore_pb.ListDocumentsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListDocumentsResponse) => void): grpc.ClientUnaryCall;
    updateDocument(request: google_firestore_v1_firestore_pb.UpdateDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    updateDocument(request: google_firestore_v1_firestore_pb.UpdateDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    updateDocument(request: google_firestore_v1_firestore_pb.UpdateDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    deleteDocument(request: google_firestore_v1_firestore_pb.DeleteDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteDocument(request: google_firestore_v1_firestore_pb.DeleteDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteDocument(request: google_firestore_v1_firestore_pb.DeleteDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    batchGetDocuments(request: google_firestore_v1_firestore_pb.BatchGetDocumentsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.BatchGetDocumentsResponse>;
    batchGetDocuments(request: google_firestore_v1_firestore_pb.BatchGetDocumentsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.BatchGetDocumentsResponse>;
    beginTransaction(request: google_firestore_v1_firestore_pb.BeginTransactionRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BeginTransactionResponse) => void): grpc.ClientUnaryCall;
    beginTransaction(request: google_firestore_v1_firestore_pb.BeginTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BeginTransactionResponse) => void): grpc.ClientUnaryCall;
    beginTransaction(request: google_firestore_v1_firestore_pb.BeginTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BeginTransactionResponse) => void): grpc.ClientUnaryCall;
    commit(request: google_firestore_v1_firestore_pb.CommitRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.CommitResponse) => void): grpc.ClientUnaryCall;
    commit(request: google_firestore_v1_firestore_pb.CommitRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.CommitResponse) => void): grpc.ClientUnaryCall;
    commit(request: google_firestore_v1_firestore_pb.CommitRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.CommitResponse) => void): grpc.ClientUnaryCall;
    rollback(request: google_firestore_v1_firestore_pb.RollbackRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    rollback(request: google_firestore_v1_firestore_pb.RollbackRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    rollback(request: google_firestore_v1_firestore_pb.RollbackRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    runQuery(request: google_firestore_v1_firestore_pb.RunQueryRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.RunQueryResponse>;
    runQuery(request: google_firestore_v1_firestore_pb.RunQueryRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.RunQueryResponse>;
    partitionQuery(request: google_firestore_v1_firestore_pb.PartitionQueryRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.PartitionQueryResponse) => void): grpc.ClientUnaryCall;
    partitionQuery(request: google_firestore_v1_firestore_pb.PartitionQueryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.PartitionQueryResponse) => void): grpc.ClientUnaryCall;
    partitionQuery(request: google_firestore_v1_firestore_pb.PartitionQueryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.PartitionQueryResponse) => void): grpc.ClientUnaryCall;
    write(): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.WriteRequest, google_firestore_v1_firestore_pb.WriteResponse>;
    write(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.WriteRequest, google_firestore_v1_firestore_pb.WriteResponse>;
    write(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.WriteRequest, google_firestore_v1_firestore_pb.WriteResponse>;
    listen(): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.ListenRequest, google_firestore_v1_firestore_pb.ListenResponse>;
    listen(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.ListenRequest, google_firestore_v1_firestore_pb.ListenResponse>;
    listen(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.ListenRequest, google_firestore_v1_firestore_pb.ListenResponse>;
    listCollectionIds(request: google_firestore_v1_firestore_pb.ListCollectionIdsRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListCollectionIdsResponse) => void): grpc.ClientUnaryCall;
    listCollectionIds(request: google_firestore_v1_firestore_pb.ListCollectionIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListCollectionIdsResponse) => void): grpc.ClientUnaryCall;
    listCollectionIds(request: google_firestore_v1_firestore_pb.ListCollectionIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListCollectionIdsResponse) => void): grpc.ClientUnaryCall;
    batchWrite(request: google_firestore_v1_firestore_pb.BatchWriteRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BatchWriteResponse) => void): grpc.ClientUnaryCall;
    batchWrite(request: google_firestore_v1_firestore_pb.BatchWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BatchWriteResponse) => void): grpc.ClientUnaryCall;
    batchWrite(request: google_firestore_v1_firestore_pb.BatchWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BatchWriteResponse) => void): grpc.ClientUnaryCall;
    createDocument(request: google_firestore_v1_firestore_pb.CreateDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    createDocument(request: google_firestore_v1_firestore_pb.CreateDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    createDocument(request: google_firestore_v1_firestore_pb.CreateDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
}

export class FirestoreClient extends grpc.Client implements IFirestoreClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getDocument(request: google_firestore_v1_firestore_pb.GetDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public getDocument(request: google_firestore_v1_firestore_pb.GetDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public getDocument(request: google_firestore_v1_firestore_pb.GetDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public listDocuments(request: google_firestore_v1_firestore_pb.ListDocumentsRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListDocumentsResponse) => void): grpc.ClientUnaryCall;
    public listDocuments(request: google_firestore_v1_firestore_pb.ListDocumentsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListDocumentsResponse) => void): grpc.ClientUnaryCall;
    public listDocuments(request: google_firestore_v1_firestore_pb.ListDocumentsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListDocumentsResponse) => void): grpc.ClientUnaryCall;
    public updateDocument(request: google_firestore_v1_firestore_pb.UpdateDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public updateDocument(request: google_firestore_v1_firestore_pb.UpdateDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public updateDocument(request: google_firestore_v1_firestore_pb.UpdateDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public deleteDocument(request: google_firestore_v1_firestore_pb.DeleteDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteDocument(request: google_firestore_v1_firestore_pb.DeleteDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteDocument(request: google_firestore_v1_firestore_pb.DeleteDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public batchGetDocuments(request: google_firestore_v1_firestore_pb.BatchGetDocumentsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.BatchGetDocumentsResponse>;
    public batchGetDocuments(request: google_firestore_v1_firestore_pb.BatchGetDocumentsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.BatchGetDocumentsResponse>;
    public beginTransaction(request: google_firestore_v1_firestore_pb.BeginTransactionRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BeginTransactionResponse) => void): grpc.ClientUnaryCall;
    public beginTransaction(request: google_firestore_v1_firestore_pb.BeginTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BeginTransactionResponse) => void): grpc.ClientUnaryCall;
    public beginTransaction(request: google_firestore_v1_firestore_pb.BeginTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BeginTransactionResponse) => void): grpc.ClientUnaryCall;
    public commit(request: google_firestore_v1_firestore_pb.CommitRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.CommitResponse) => void): grpc.ClientUnaryCall;
    public commit(request: google_firestore_v1_firestore_pb.CommitRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.CommitResponse) => void): grpc.ClientUnaryCall;
    public commit(request: google_firestore_v1_firestore_pb.CommitRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.CommitResponse) => void): grpc.ClientUnaryCall;
    public rollback(request: google_firestore_v1_firestore_pb.RollbackRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public rollback(request: google_firestore_v1_firestore_pb.RollbackRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public rollback(request: google_firestore_v1_firestore_pb.RollbackRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public runQuery(request: google_firestore_v1_firestore_pb.RunQueryRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.RunQueryResponse>;
    public runQuery(request: google_firestore_v1_firestore_pb.RunQueryRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<google_firestore_v1_firestore_pb.RunQueryResponse>;
    public partitionQuery(request: google_firestore_v1_firestore_pb.PartitionQueryRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.PartitionQueryResponse) => void): grpc.ClientUnaryCall;
    public partitionQuery(request: google_firestore_v1_firestore_pb.PartitionQueryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.PartitionQueryResponse) => void): grpc.ClientUnaryCall;
    public partitionQuery(request: google_firestore_v1_firestore_pb.PartitionQueryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.PartitionQueryResponse) => void): grpc.ClientUnaryCall;
    public write(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.WriteRequest, google_firestore_v1_firestore_pb.WriteResponse>;
    public write(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.WriteRequest, google_firestore_v1_firestore_pb.WriteResponse>;
    public listen(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.ListenRequest, google_firestore_v1_firestore_pb.ListenResponse>;
    public listen(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_firestore_v1_firestore_pb.ListenRequest, google_firestore_v1_firestore_pb.ListenResponse>;
    public listCollectionIds(request: google_firestore_v1_firestore_pb.ListCollectionIdsRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListCollectionIdsResponse) => void): grpc.ClientUnaryCall;
    public listCollectionIds(request: google_firestore_v1_firestore_pb.ListCollectionIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListCollectionIdsResponse) => void): grpc.ClientUnaryCall;
    public listCollectionIds(request: google_firestore_v1_firestore_pb.ListCollectionIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.ListCollectionIdsResponse) => void): grpc.ClientUnaryCall;
    public batchWrite(request: google_firestore_v1_firestore_pb.BatchWriteRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BatchWriteResponse) => void): grpc.ClientUnaryCall;
    public batchWrite(request: google_firestore_v1_firestore_pb.BatchWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BatchWriteResponse) => void): grpc.ClientUnaryCall;
    public batchWrite(request: google_firestore_v1_firestore_pb.BatchWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_firestore_pb.BatchWriteResponse) => void): grpc.ClientUnaryCall;
    public createDocument(request: google_firestore_v1_firestore_pb.CreateDocumentRequest, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public createDocument(request: google_firestore_v1_firestore_pb.CreateDocumentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
    public createDocument(request: google_firestore_v1_firestore_pb.CreateDocumentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_firestore_v1_document_pb.Document) => void): grpc.ClientUnaryCall;
}
