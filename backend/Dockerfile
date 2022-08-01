FROM python:3.10-slim-buster
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /uralsp

COPY Pipfile.lock .
RUN apt-get update && \
    apt-get install make && \
    pip install pipenv && \
    pipenv sync --clear

EXPOSE 8000

COPY . .