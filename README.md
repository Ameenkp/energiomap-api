
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
**end points you can try**: 

1. get all the state wise details
   - http://localhost:3000/api/states
2. get top N plants 
   - http://localhost:3000/api/plants/top?limit=10
3. get all the plants for a particular state (eg : AK for alaska)
   - http://localhost:3000/api/plants/state/AK
4. get all the plants with filter , sort, and search
   - http://localhost:3000/api/plants?limit=100&pageKey=7b716617-aa30-4d9b-b50c-cbadd5c92267&state=AK&sortBy=state&sortOrder=ASC&search=energy
5. get a particular plant details by its id
   - http://localhost:3000/api/plants/836c4d05-1507-458a-8673-1abe335075a8  
6. get a particular plant's state
   - http://localhost:3000/api/plants/836c4d05-1507-458a-8673-1abe335075a8/state

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
- bash

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