FROM python:3.10-slim-buster
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY Pipfile .
RUN apt-get update && \
    apt-get install make && \
    pip install pipenv && \
    pipenv install --clear

EXPOSE 8000

COPY . .