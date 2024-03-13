lint-frontend:
	make -C frontend lint

install:
	npm ci

#build:
#	make -C frontend start
#
#start:
#	npx start-server

deploy:
	git push heroku main

#start:
#	make start-backend & make start-frontend
start:
	 npx start-server -s ./frontend/build

build:
	npm install --ignore-scripts && npm --prefix ./frontend install && npm run build --prefix frontend
