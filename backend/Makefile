dev:
	pipenv run python src/manage.py runserver

run:
	cd src && pipenv run gunicorn -c config/gunicorn.conf.py config.wsgi:application

migration:
	pipenv run python src/manage.py makemigrations -n ${n}

migrate:
	pipenv run python src/manage.py migrate ${o}

lint:
	pipenv run isort . & \
	pipenv run flake8 --config setup.cfg & \
	pipenv run black --config pyproject.toml .

check_lint:
	pipenv run isort --check --diff .
	pipenv run flake8 --config setup.cfg
	pipenv run black --check --config pyproject.toml .

sql:
	pipenv run python src/manage.py debugsqlshell

# Docker

up:
	docker-compose -f docker-compose.prod.yml up --build

down:
	docker-compose -f docker-compose.prod.yml down


# Tests

test:
	cd src && pipenv run pytest --disable-warnings

unit:
	cd src && pipenv run pytest -m unit --disable-warnings

smoke:
	cd src && pipenv run pytest -m smoke --disable-warnings

integration:
	cd src && pipenv run pytest -m integration --disable-warnings


# Managements

super:
	pipenv run python src/manage.py makesuper ${id}

admin:
	pipenv run python src/manage.py makeadmin ${id}

token:
	pipenv run python src/manage.py token ${id}