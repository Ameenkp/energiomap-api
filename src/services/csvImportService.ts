import * as fs from 'fs';
import csv from 'csv-parser';
import {State} from "../models/entity/state.entity";
import {AppDataSource} from "../config/ormConfig";
import {Plant} from "../models/entity/plant.entity";
import {join} from "path";

export interface PlantData {
    id: string;
    plantName: string;
    plantNameplateCapacityMW: number;
    plantAnnualNetGenerationMWh: number ;
    stateId: string;
}
export class CsvImporter {
    public async importStates(): Promise<State[]> {
        const filePath = join(__dirname, '../data/state.csv');
        const states: State[] = [];
        const stream = fs.createReadStream(filePath).pipe(csv({ headers: true }));

        for await (const row of stream) {
            const stateData: State = this.createState(row) // Use State type directly
            states.push(stateData);
        }

        await AppDataSource.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(states);
        });

        return states;
    }

    // Import plants from CSV
    async importPlants(): Promise<Plant[]> {
        const filePath = join(__dirname, '../data/plant.csv');
        const plants: Plant[] = [];
        const stream = fs.createReadStream(filePath).pipe(csv({ headers: true }));

        for await (const row of stream) {
            const plantData: PlantData =this.createPlant(row) ;

            // Find the corresponding state based on stateName
            const state = await AppDataSource.getRepository(State).findOneBy({ id: plantData.stateId });
            if (!state) {
                throw new Error(`State with id ${plantData.stateId} not found`);
            }

            plants.push(new Plant(
                plantData.id,
                plantData.plantName,
                plantData.plantNameplateCapacityMW,
                String(plantData.plantAnnualNetGenerationMWh) === '' ? null : plantData.plantAnnualNetGenerationMWh,
                state
            ));
        }

        // Save plants to the database in a transaction
        await AppDataSource.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(plants);
        });

        return plants;
    }


    createState(state: any): State {
        return new State(state._0,
            state._1,
            state._2,
            state._3,
            state._4,
            state._5);
    }
    createPlant(plant: any): PlantData {
        return {
            id: plant._0,
            plantName: plant._1,
            plantNameplateCapacityMW: plant._2,
            plantAnnualNetGenerationMWh: plant._3,
            stateId: plant._4
        };
    }
}
