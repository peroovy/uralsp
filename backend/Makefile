dev:
	pipenv run python src/manage.py runserver

run:
	cd src && pipenv run gunicorn -c config/gunicorn.conf.py config.wsgi:application

super:
	pipenv run python src/manage.py makesuper ${id}

admin:
	pipenv run python src/manage.py makeadmin ${id}

migration:
	pipenv run python src/manage.py makemigrations -n ${n}

migrate:
	pipenv run python src/manage.py migrate ${o}

lint:
	pipenv run isort . & \
	pipenv run flake8 --config setup.cfg & \
	pipenv run black --config pyproject.toml .

check_lint:
	pipenv run isort --check --diff . & \
	pipenv run flake8 --config setup.cfg & \
	pipenv run black --check --config pyproject.toml .

sql:
	pipenv run python src/manage.py debugsqlshell

test:
	cd src && pipenv run pytest

unit:
	cd src && pipenv run pytest -m unit

smoke:
	cd src && pipenv run pytest -m smoke

integration:
	cd src && pipenv run pytest -m integration

up:
	docker-compose up --build

down:
	docker-compose down
