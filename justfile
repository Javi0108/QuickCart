runserver: _database _redis
    python manage.py runserver

runserver0: _database _redis
    python manage.py runserver 0.0.0.0:80

check:
    python manage.py check

shell: _database
    python manage.py shell

makemigrations app="": _database
    python manage.py makemigrations {{ app }}

showmigrations app="": _database
    python manage.py showmigrations {{ app }}

migrate app="": _database
    python manage.py migrate {{ app }}

startapp app:
    python manage.py startapp {{ app }}

sql app migration_id:
    python manage.py sqlmigrate {{ app }} {{ migration_id }}

createsu: _database
    python manage.py createsuperuser

dumpdata output: _database
    python manage.py dumpdata --indent=2 --output={{ output }}

loaddata input: _database
    python manage.py loaddata {{ input }}

dshell:
    python manage.py debugsqlshell

_database:
    #!/usr/bin/env bash
    if [ ! -e *.sqlite3 ]; then
        if   [[ $OSTYPE == "linux-gnu"* ]]; then
            sudo service postgresql status &> /dev/null || sudo service postgresql start
        elif [[ $OSTYPE == "darwin"* ]]; then
            pgrep -x postgres || open /Applications/Postgres.app
        fi
    fi

_redis:
    #!/usr/bin/env bash
    if   [[ $OSTYPE == "linux-gnu"* ]]; then
        sudo service redis status &> /dev/null || sudo service redis start
    elif [[ $OSTYPE == "darwin"* ]]; then
        pgrep -x redis || open /Applications/Redis.app
    fi
dockup:
    docker compose up

zip: clean
    #!/usr/bin/env bash
    rm -f bank_arrota.zip
    zip -r bank_arrota.zip . -x .env .venv/**\*

clean:
    #!/usr/bin/env bash
    find . -name '__pycache__' -not -path "./.venv/*" -prune -exec rm -rf {} \;
    find . -name '*.pyc' -not -path "./.venv/*" -exec rm {} \;
    find . -name '.DS_Store' -not -path "./.venv/*" -exec rm {} \;
    rm -rf .mypy_cache
