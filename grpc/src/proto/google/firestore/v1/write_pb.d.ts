// package: google.firestore.v1
// file: google/firestore/v1/write.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_firestore_v1_common_pb from "../../../google/firestore/v1/common_pb";
import * as google_firestore_v1_document_pb from "../../../google/firestore/v1/document_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Write extends jspb.Message { 

    hasUpdate(): boolean;
    clearUpdate(): void;
    getUpdate(): google_firestore_v1_document_pb.Document | undefined;
    setUpdate(value?: google_firestore_v1_document_pb.Document): Write;

    hasDelete(): boolean;
    clearDelete(): void;
    getDelete(): string;
    setDelete(value: string): Write;

    hasTransform(): boolean;
    clearTransform(): void;
    getTransform(): DocumentTransform | undefined;
    setTransform(value?: DocumentTransform): Write;

    hasUpdateMask(): boolean;
    clearUpdateMask(): void;
    getUpdateMask(): google_firestore_v1_common_pb.DocumentMask | undefined;
    setUpdateMask(value?: google_firestore_v1_common_pb.DocumentMask): Write;
    clearUpdateTransformsList(): void;
    getUpdateTransformsList(): Array<DocumentTransform.FieldTransform>;
    setUpdateTransformsList(value: Array<DocumentTransform.FieldTransform>): Write;
    addUpdateTransforms(value?: DocumentTransform.FieldTransform, index?: number): DocumentTransform.FieldTransform;

    hasCurrentDocument(): boolean;
    clearCurrentDocument(): void;
    getCurrentDocument(): google_firestore_v1_common_pb.Precondition | undefined;
    setCurrentDocument(value?: google_firestore_v1_common_pb.Precondition): Write;

    getOperationCase(): Write.OperationCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Write.AsObject;
    static toObject(includeInstance: boolean, msg: Write): Write.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Write, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Write;
    static deserializeBinaryFromReader(message: Write, reader: jspb.BinaryReader): Write;
}

export namespace Write {
    export type AsObject = {
        update?: google_firestore_v1_document_pb.Document.AsObject,
        pb_delete: string,
        transform?: DocumentTransform.AsObject,
        updateMask?: google_firestore_v1_common_pb.DocumentMask.AsObject,
        updateTransformsList: Array<DocumentTransform.FieldTransform.AsObject>,
        currentDocument?: google_firestore_v1_common_pb.Precondition.AsObject,
    }

    export enum OperationCase {
        OPERATION_NOT_SET = 0,
        UPDATE = 1,
        DELETE = 2,
        TRANSFORM = 6,
    }

}

export class DocumentTransform extends jspb.Message { 
    getDocument(): string;
    setDocument(value: string): DocumentTransform;
    clearFieldTransformsList(): void;
    getFieldTransformsList(): Array<DocumentTransform.FieldTransform>;
    setFieldTransformsList(value: Array<DocumentTransform.FieldTransform>): DocumentTransform;
    addFieldTransforms(value?: DocumentTransform.FieldTransform, index?: number): DocumentTransform.FieldTransform;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DocumentTransform.AsObject;
    static toObject(includeInstance: boolean, msg: DocumentTransform): DocumentTransform.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DocumentTransform, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DocumentTransform;
    static deserializeBinaryFromReader(message: DocumentTransform, reader: jspb.BinaryReader): DocumentTransform;
}

export namespace DocumentTransform {
    export type AsObject = {
        document: string,
        fieldTransformsList: Array<DocumentTransform.FieldTransform.AsObject>,
    }


    export class FieldTransform extends jspb.Message { 
        getFieldPath(): string;
        setFieldPath(value: string): FieldTransform;

        hasSetToServerValue(): boolean;
        clearSetToServerValue(): void;
        getSetToServerValue(): DocumentTransform.FieldTransform.ServerValue;
        setSetToServerValue(value: DocumentTransform.FieldTransform.ServerValue): FieldTransform;

        hasIncrement(): boolean;
        clearIncrement(): void;
        getIncrement(): google_firestore_v1_document_pb.Value | undefined;
        setIncrement(value?: google_firestore_v1_document_pb.Value): FieldTransform;

        hasMaximum(): boolean;
        clearMaximum(): void;
        getMaximum(): google_firestore_v1_document_pb.Value | undefined;
        setMaximum(value?: google_firestore_v1_document_pb.Value): FieldTransform;

        hasMinimum(): boolean;
        clearMinimum(): void;
        getMinimum(): google_firestore_v1_document_pb.Value | undefined;
        setMinimum(value?: google_firestore_v1_document_pb.Value): FieldTransform;

        hasAppendMissingElements(): boolean;
        clearAppendMissingElements(): void;
        getAppendMissingElements(): google_firestore_v1_document_pb.ArrayValue | undefined;
        setAppendMissingElements(value?: google_firestore_v1_document_pb.ArrayValue): FieldTransform;

        hasRemoveAllFromArray(): boolean;
        clearRemoveAllFromArray(): void;
        getRemoveAllFromArray(): google_firestore_v1_document_pb.ArrayValue | undefined;
        setRemoveAllFromArray(value?: google_firestore_v1_document_pb.ArrayValue): FieldTransform;

        getTransformTypeCase(): FieldTransform.TransformTypeCase;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): FieldTransform.AsObject;
        static toObject(includeInstance: boolean, msg: FieldTransform): FieldTransform.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: FieldTransform, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): FieldTransform;
        static deserializeBinaryFromReader(message: FieldTransform, reader: jspb.BinaryReader): FieldTransform;
    }

    export namespace FieldTransform {
        export type AsObject = {
            fieldPath: string,
            setToServerValue: DocumentTransform.FieldTransform.ServerValue,
            increment?: google_firestore_v1_document_pb.Value.AsObject,
            maximum?: google_firestore_v1_document_pb.Value.AsObject,
            minimum?: google_firestore_v1_document_pb.Value.AsObject,
            appendMissingElements?: google_firestore_v1_document_pb.ArrayValue.AsObject,
            removeAllFromArray?: google_firestore_v1_document_pb.ArrayValue.AsObject,
        }

        export enum ServerValue {
    SERVER_VALUE_UNSPECIFIED = 0,
    REQUEST_TIME = 1,
        }


        export enum TransformTypeCase {
            TRANSFORM_TYPE_NOT_SET = 0,
            SET_TO_SERVER_VALUE = 2,
            INCREMENT = 3,
            MAXIMUM = 4,
            MINIMUM = 5,
            APPEND_MISSING_ELEMENTS = 6,
            REMOVE_ALL_FROM_ARRAY = 7,
        }

    }

}

export class WriteResult extends jspb.Message { 

    hasUpdateTime(): boolean;
    clearUpdateTime(): void;
    getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): WriteResult;
    clearTransformResultsList(): void;
    getTransformResultsList(): Array<google_firestore_v1_document_pb.Value>;
    setTransformResultsList(value: Array<google_firestore_v1_document_pb.Value>): WriteResult;
    addTransformResults(value?: google_firestore_v1_document_pb.Value, index?: number): google_firestore_v1_document_pb.Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WriteResult.AsObject;
    static toObject(includeInstance: boolean, msg: WriteResult): WriteResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WriteResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WriteResult;
    static deserializeBinaryFromReader(message: WriteResult, reader: jspb.BinaryReader): WriteResult;
}

export namespace WriteResult {
    export type AsObject = {
        updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        transformResultsList: Array<google_firestore_v1_document_pb.Value.AsObject>,
    }
}

export class DocumentChange extends jspb.Message { 

    hasDocument(): boolean;
    clearDocument(): void;
    getDocument(): google_firestore_v1_document_pb.Document | undefined;
    setDocument(value?: google_firestore_v1_document_pb.Document): DocumentChange;
    clearTargetIdsList(): void;
    getTargetIdsList(): Array<number>;
    setTargetIdsList(value: Array<number>): DocumentChange;
    addTargetIds(value: number, index?: number): number;
    clearRemovedTargetIdsList(): void;
    getRemovedTargetIdsList(): Array<number>;
    setRemovedTargetIdsList(value: Array<number>): DocumentChange;
    addRemovedTargetIds(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DocumentChange.AsObject;
    static toObject(includeInstance: boolean, msg: DocumentChange): DocumentChange.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DocumentChange, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DocumentChange;
    static deserializeBinaryFromReader(message: DocumentChange, reader: jspb.BinaryReader): DocumentChange;
}

export namespace DocumentChange {
    export type AsObject = {
        document?: google_firestore_v1_document_pb.Document.AsObject,
        targetIdsList: Array<number>,
        removedTargetIdsList: Array<number>,
    }
}

export class DocumentDelete extends jspb.Message { 
    getDocument(): string;
    setDocument(value: string): DocumentDelete;
    clearRemovedTargetIdsList(): void;
    getRemovedTargetIdsList(): Array<number>;
    setRemovedTargetIdsList(value: Array<number>): DocumentDelete;
    addRemovedTargetIds(value: number, index?: number): number;

    hasReadTime(): boolean;
    clearReadTime(): void;
    getReadTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setReadTime(value?: google_protobuf_timestamp_pb.Timestamp): DocumentDelete;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DocumentDelete.AsObject;
    static toObject(includeInstance: boolean, msg: DocumentDelete): DocumentDelete.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DocumentDelete, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DocumentDelete;
    static deserializeBinaryFromReader(message: DocumentDelete, reader: jspb.BinaryReader): DocumentDelete;
}

export namespace DocumentDelete {
    export type AsObject = {
        document: string,
        removedTargetIdsList: Array<number>,
        readTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class DocumentRemove extends jspb.Message { 
    getDocument(): string;
    setDocument(value: string): DocumentRemove;
    clearRemovedTargetIdsList(): void;
    getRemovedTargetIdsList(): Array<number>;
    setRemovedTargetIdsList(value: Array<number>): DocumentRemove;
    addRemovedTargetIds(value: number, index?: number): number;

    hasReadTime(): boolean;
    clearReadTime(): void;
    getReadTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setReadTime(value?: google_protobuf_timestamp_pb.Timestamp): DocumentRemove;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DocumentRemove.AsObject;
    static toObject(includeInstance: boolean, msg: DocumentRemove): DocumentRemove.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DocumentRemove, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DocumentRemove;
    static deserializeBinaryFromReader(message: DocumentRemove, reader: jspb.BinaryReader): DocumentRemove;
}

export namespace DocumentRemove {
    export type AsObject = {
        document: string,
        removedTargetIdsList: Array<number>,
        readTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class ExistenceFilter extends jspb.Message { 
    getTargetId(): number;
    setTargetId(value: number): ExistenceFilter;
    getCount(): number;
    setCount(value: number): ExistenceFilter;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExistenceFilter.AsObject;
    static toObject(includeInstance: boolean, msg: ExistenceFilter): ExistenceFilter.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExistenceFilter, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExistenceFilter;
    static deserializeBinaryFromReader(message: ExistenceFilter, reader: jspb.BinaryReader): ExistenceFilter;
}

export namespace ExistenceFilter {
    export type AsObject = {
        targetId: number,
        count: number,
    }
}
