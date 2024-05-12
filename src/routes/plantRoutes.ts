// src/routes/plantRoutes.ts
import express from 'express';
import { Request, Response } from 'express';
import {PlantController} from "../controllers/plantController";
import {CustomRequest} from "../models/requestDto";
const router = express.Router();

const plantController:PlantController = new PlantController();

router.get('/top', (req:Request , res:Response) => plantController.getTopPlants(req, res));
router.get('/state/:state',(req:Request , res:Response) => plantController.getPlantsByState(req, res));
router.get('/', (req:CustomRequest , res:Response) => plantController.getAllPlants(req, res));
router.get('/:plantId', (req:Request , res:Response) => plantController.getPlantById(req, res));
router.get('/:plantId/state', (req:Request , res:Response) => plantController.getPlantState(req, res));

export default router;
