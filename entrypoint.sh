#!/bin/sh

# Function to check if the database is ready
check_database() {
    # Attempt to connect to the database using a simple query
    # shellcheck disable=SC2039
    if node -e "const typeorm = require('typeorm'); typeorm.createConnection().then(async connection => { await connection.query('SELECT 1'); }).catch(error => console.log(error));" &> /dev/null; then
        echo "Database is ready"
        return 0
    else
        echo "Database is not ready"
        return 1
    fi
}

# Wait for the database to be ready (adjust the timeout as needed)
# shellcheck disable=SC2039
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

# Wait for the database to be ready
wait_for_database

# Run TypeORM migrations
npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/ormConfig.ts

# Start your Node.js app
npm run start