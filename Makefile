up:
	docker-compose -f docker-compose.prod.yml up --build

down:
	docker-compose -f docker-compose.prod.yml down

migrate:
	cd backend && make migrate

run:
	cd backend && make run

