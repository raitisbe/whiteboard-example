Project is deployed at [https://dih.bosc.lv/whiteboard-demo/](https://dih.bosc.lv/whiteboard-demo/)

# Install & run

```
npm link hslayers-ng
```

```
npm run build-prod
docker-compose build
docker-compose up -d
```

The included nginx docker is exposed on port 25348, so you will need to setup nginx on the host machine similar to:

```
listen       80;
server_name  whiteboard-demo.lv;

location / {
    proxy_pass http://127.0.0.1:25348/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
}

```


```
