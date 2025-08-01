#!/usr/bin/env bash
apt-get update && apt-get install -y libjpeg-dev zlib1g-dev
pip install --upgrade pip
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
