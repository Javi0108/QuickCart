#!/bin/bash

cd $(dirname $0)
source .venv/bin/activate
gunicorn -b unix:/tmp/quickdjango.sock quickdjango.wsgi:application
