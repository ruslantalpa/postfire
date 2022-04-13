# docker build -t subzerocloud/subzero-development-grpc .
# FROM esplo/docker-grpc-web-proxy as builder
FROM subzerocloud/subzero-development
RUN apk add --no-cache nodejs

# COPY --from=builder /grpcwebproxy /usr/bin/grpcwebproxy

ENV GRPC_PORT=
ENV GRPC_REST_ENDPOINT=
ENV GRPC_PROJECT_ID=
ENV GRPC_DATABASE_NAME=
ENV GRPC_LIVE_UPDATE_INTERVAL=
ENV GRPC_JWT_SECRET=