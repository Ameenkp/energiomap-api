
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