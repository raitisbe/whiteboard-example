deploy-ui:
	npm run build-prod && docker-compose stop whiteboard-demo-ui && docker-compose build whiteboard-demo-ui && docker-compose up -d whiteboard-demo-ui

deploy-whiteboard:
	docker-compose stop whiteboard-demo-server && docker-compose build whiteboard-demo-server && docker-compose up -d whiteboard-demo-server && docker cp whiteboard-demo-server:/srv/map-whiteboard-server/docs whiteboard-server-docs

deploy-whiteboard-db:
	docker-compose stop whiteboard-demo-db && docker-compose build whiteboard-demo-db && docker-compose up -d whiteboard-demo-db

deploy-nginx:
	docker-compose stop whiteboard-demo-nginx && docker-compose build whiteboard-demo-nginx && docker-compose up -d whiteboard-demo-nginx

deploy-proxy:
	docker-compose stop whiteboard-demo-proxy && docker-compose build whiteboard-demo-proxy && docker-compose up -d whiteboard-demo-proxy

deploy-swagger:
	docker-compose stop whiteboard-demo-swagger && docker-compose build whiteboard-demo-swagger && docker-compose up -d whiteboard-demo-swagger

deploy-admin:
	docker-compose stop whiteboard-demo-admin && docker-compose build --no-cache whiteboard-demo-admin && docker-compose up -d whiteboard-demo-admin
