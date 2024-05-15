
# ENERGIOMAP API

## Description

This is the API for the Energiomap project. It is a RESTful API that provides data for the Energiomap project.

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Endpoints



#### DB Migration scripts for running pg migrations 

```bash
npx ts-node ./node_modules/typeorm/cli.js migration:create -d src/config/ormConfig.ts
npx ts-node ./node_modules/typeorm/cli.js migration:generate -n <migration_name> -d src/config/ormConfig.ts
npx ts-node ./node_modules/typeorm/cli.js migration:show -d src/config/ormConfig.ts
npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/ormConfig.ts
npx ts-node ./node_modules/typeorm/cli.js migration:revert -d src/config/ormConfig.ts
``` 


### Prerequisites

- Docker
- Docker Compose

### Building and Running with Docker Compose

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ameenkp/image-resizer-api.git
   
    cd image-resize-api
    ```
2. **Build the Docker Image**:
    ```bash
    docker-compose build 
    ```
3. **Run the Docker Container**:
    ```bash
    docker-compose up
    ```

4. **Access the API**:
   The API specs/docs are published using Postman.
   The API is accessible at [get-api-docs](https://documenter.getpostman.com/view/33862528/2sA3JNb1E2)