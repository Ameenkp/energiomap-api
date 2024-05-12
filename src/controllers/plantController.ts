import { Request, Response } from 'express';
import { PlantService } from '../services/plantService';
import {Plant} from "../models/entity/plant.entity";
import {logger} from "../utils/logger";
import {CustomRequest, RequestDto} from "../models/requestDto";
import {Query} from "typeorm/driver/Query";

export class PlantController {
    private plantService: PlantService;

    constructor() {
        this.plantService = new PlantService();
    }

    public async getTopPlants(req: Request, res: Response):Promise<void> {
        const limit:number = parseInt(req.query.limit as string, 10) || 10;
        try {
            const plants:Plant[] = await this.plantService.getTopPlants(limit);
            res.status(200).json(plants);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }

    async getPlantsByState(req: Request, res: Response):Promise<void> {
        const state = req.params.state;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        try {
            const plants:Plant[] = await this.plantService.getPlantsByState(state, limit);
            res.status(200).json(plants);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }

    async getAllPlants(req: CustomRequest, res: Response):Promise<void> {
        try {
            const {query} = req;
            const plants:Plant[] = await this.plantService.getAllPlants(query.limit, query.pageKey, query.state, query.sortBy, query.sortOrder, query.search);
            res.status(200).json(plants);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }

    async getPlantById(req: Request, res: Response):Promise<void> {
        const plantId:string =  req.params.plantId;
        try {
            const plant:Plant | null = await this.plantService.getPlantById(plantId);
            if (plant) {
                res.status(200).json(plant);
            } else {
                res.status(404).json({ error: 'Plant not found' });
            }
        } catch (error:any) {
            logger.error(error.message);
            res.status(500).json({ error: 'An error occurred' });
        }
    }

    async getPlantState(req: Request, res: Response):Promise<void> {
        const plantId :string= req.params.plantId;
        try {
            const plant = await this.plantService.getPlantState(plantId);
            if (plant) {
                res.status(200).json(plant.state);
            } else {
                res.status(404).json({ error: 'Plant not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
}

