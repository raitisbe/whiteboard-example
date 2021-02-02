deploy-ui:
	npm run build-prod && docker-compose stop whiteboard-demo-ui && docker-compose build whiteboard-demo-ui && docker-compose up -d whiteboard-demo-ui

deploy-whiteboard:
	docker-compose stop whiteboard-demo-server && docker-compose build whiteboard-demo-server && docker-compose up -d whiteboard-demo-server

deploy-whiteboard-db:
	docker-compose stop whiteboard-demo-db && docker-compose build whiteboard-demo-db && docker-compose up -d whiteboard-demo-db

deploy-nginx:
	docker-compose stop whiteboard-demo-nginx && docker-compose build whiteboard-demo-nginx && docker-compose up -d whiteboard-demo-nginx

deploy-proxy:
	docker-compose stop whiteboard-demo-proxy && docker-compose build whiteboard-demo-proxy && docker-compose up -d whiteboard-demo-proxy
