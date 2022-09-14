build:
	docker-compose build

push:
	docker-compose push

pull:
	docker-compose pull

lint:
	docker-compose run --rm app make check_lint

test:
	docker-compose run --rm app make test

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose stop
	docker-compose rm -f
	make pull
	make up

migrate:
	cd backend && make migrate

run:
	cd backend && make run

