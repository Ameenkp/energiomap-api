#!/bin/sh

check_database() {
    if node -e "const typeorm = require('typeorm'); typeorm.createConnection().then(async connection => { await connection.query('SELECT 1'); }).catch(error => console.log(error));" &> /dev/null; then
        echo "Database is ready"
        return 0
    else
        echo "Database is not ready"
        return 1
    fi
}

wait_for_database() {
    local max_attempts=30
    local attempt=0
    local wait_seconds=1
    until check_database || [ $attempt -eq $max_attempts ]; do
        echo "Waiting for the database to be ready..."
        sleep $wait_seconds
        attempt=$((attempt + 1))
    done
    if [ $attempt -eq $max_attempts ]; then
        echo "Timeout: Database is not ready after $((max_attempts * wait_seconds)) seconds"
        exit 1
    fi
}

wait_for_database

npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/ormConfig.ts

npm run start