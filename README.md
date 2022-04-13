# run
```
docker-compose build
```


# build grpc related code from source
```
cd grpc
```
```
yarn install --ignore-scripts
cd node_modules/grpc-tools
node_modules/.bin/node-pre-gyp  install --target_arch=x64
cd ../../
```

```
yarn proto
```

```
yarn build
```


