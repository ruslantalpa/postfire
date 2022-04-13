#!/bin/bash
echo $0
BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

PROTO_DEST=./src/proto

mkdir -p ${PROTO_DEST}

# JavaScript code generation
sudo chmod +x node_modules/protobufjs/cli/bin/pbjs node_modules/protobufjs/cli/bin/pbts
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${PROTO_DEST} \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=grpc_js:${PROTO_DEST} \
    -I ./node_modules/@google-cloud/firestore/build/protos \
    node_modules/@google-cloud/firestore/build/protos/google/firestore/v1/*.proto \
    node_modules/@google-cloud/firestore/build/protos/google/rpc/*.proto \
    node_modules/@google-cloud/firestore/build/protos/google/api/*.proto \
    node_modules/@google-cloud/firestore/build/protos/google/type/*.proto


node_modules/protobufjs/cli/bin/pbjs -t static-module -w es6 \
    -p node_modules/@google-cloud/firestore/build/protos \
    -o src/proto/document.js \
    node_modules/@google-cloud/firestore/build/protos/google/firestore/v1/document.proto

node_modules/protobufjs/cli/bin/pbts -o src/proto/document.d.ts src/proto/document.js
