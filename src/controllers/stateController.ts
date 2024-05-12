// src/controllers/stateController.ts
import { Request, Response } from 'express';
import { StateService } from '../services/stateService';
import {State} from "../models/entity/state.entity";

export class StateController {
    private stateService: StateService;

    constructor() {
        this.stateService = new StateService();
    }

    async getAllStates(req: Request, res: Response):Promise<void> {
        try {
            const states:State[] = await this.stateService.getAllStates();
            res.status(200).json(states);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
}