// src/services/plantService.ts
import {Repository} from 'typeorm';
import {AppDataSource} from "../config/ormConfig";
import {Plant} from "../models/entity/plant.entity";
import {logger} from "../utils/logger";

export class PlantService {
    private plantRepository: Repository<Plant>;

    constructor() {
        this.plantRepository = AppDataSource.getRepository(Plant);
    }

    // async getTopPlants(limit: number): Promise<Plant[]> {
    //     return this.plantRepository.find({
    //         take: limit,
    //         relations: ['state'],
    //         order: { plantAnnualNetGenerationMWh: 'DESC' },
    //     });
    // }
    async getTopPlants(limit: number): Promise<Plant[]> {
        try {
            return await this.plantRepository
                .createQueryBuilder('plant')
                .select(['plant', 'state.abbreviation', 'state.name'])
                .leftJoin('plant.state', 'state')
                .orderBy('plant.plantAnnualNetGenerationMWh', 'DESC', 'NULLS LAST')
                .limit(limit)
                .getMany();
        } catch (error) {
            logger.error(error);
            throw new Error('An error occurred');
        }
    }

    async getPlantsByState(state: string, limit: number): Promise<Plant[]> {
        try {
            return await this.plantRepository
                .createQueryBuilder('plant')
                .select(['plant', 'state.abbreviation', 'state.name'])
                .leftJoin('plant.state', 'state')
                .where('state.abbreviation = :state', {state})
                .orderBy('plant.plantAnnualNetGenerationMWh', 'DESC', 'NULLS LAST')
                .limit(limit)
                .getMany();
        } catch (error) {
            logger.error(error);
            throw new Error('An error occurred in getPlantsByState');
        }
    }

    async getPlantById(plantId: string): Promise<Plant | null> {
        try {
            return await this.plantRepository.createQueryBuilder('plant')
                .select(['plant', 'state.abbreviation', 'state.name'])
                .leftJoin('plant.state', 'state')
                .where('plant.id = :id', {id: plantId})
                .getOne();
        }
        catch (error) {
            logger.error(error);
            throw new Error('An error occurred in getPlantById');
        }
    }

    async getPlantState(plantId: string): Promise<Plant | null> {
        return this.plantRepository.findOne({
            where: { id: plantId },
            relations: ['state'],
        });
    }

    async searchPlantByName(plantName: string): Promise<Plant[]> {
        try {
            return await this.plantRepository.createQueryBuilder('plant')
                .select(['plant', 'state.abbreviation', 'state.name'])
                .leftJoin('plant.state', 'state')
                .where('plant.plantName ILIKE :plantName', {plantName: `%${plantName}%`})
                .getMany();
        } catch (error) {
            logger.error(error);
            throw new Error('An error occurred in searchPlantByName');
        }
    }

    //create a method to get all plants , and if search term is provided, search by given plant name
    // async getAllPlants(limit:number , searchTerm:string): Promise<Plant[]> {
    //
    //     try {
    //         if (searchTerm) {
    //             return this.plantRepository.createQueryBuilder('plant')
    //                 .select(['plant', 'state.abbreviation', 'state.name'])
    //                 .leftJoin('plant.state', 'state')
    //                 .where('plant.plantName ILIKE :plantName', {plantName: `%${searchTerm}%`})
    //                 .getMany();
    //         }
    //         return this.plantRepository.createQueryBuilder('plant')
    //             .select(['plant', 'state.abbreviation', 'state.name'])
    //             .leftJoin('plant.state', 'state')
    //             .getMany();
    //     } catch (error) {
    //         logger.error(error);
    //         throw new Error('An error occurred in getAllPlants');
    //     }
    // }

    async getAllPlants(limit: number, pageKey: string, state: string, sortBy: string, sortOrder: "ASC" | "DESC", searchTerm: string): Promise<Plant[]> {
        try {
            const query = this.plantRepository.createQueryBuilder('plant')
                .select(['plant', 'state.abbreviation', 'state.name'])
                .leftJoin('plant.state', 'state')
                .take(limit)
            if(sortBy){
                query.orderBy(`plant.${sortBy}`, sortOrder || 'ASC');
            }
            if (pageKey) {
                query.where(`plant.id > :pageKey`, {pageKey});
            }
            if (state) {
                query.andWhere('state.abbreviation = :state', {state});
            }
            if (searchTerm) {
                query.andWhere('plant.plantName ILIKE :plantName', {plantName: `%${searchTerm}%`});
            }
            return await query.getMany();
        } catch (error:any) {
            logger.error(error.message);
            throw new Error('An error occurred in getAllPlants');
        }

    }
}
