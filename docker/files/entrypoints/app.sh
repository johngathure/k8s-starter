#!/usr/bin/env bash

set -e

python manage.py migrate --no-input

gunicorn app.wsgi:application --workers 3 --timeout 120 --bind 0.0.0.0:8002
