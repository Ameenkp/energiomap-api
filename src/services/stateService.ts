import { Repository } from 'typeorm';
import {State} from "../models/entity/state.entity";
import {AppDataSource} from "../config/ormConfig";

export class StateService {
    private stateRepository: Repository<State>;

    constructor() {
        this.stateRepository = AppDataSource.getRepository(State);
    }

    async getAllStates(): Promise<State[]> {
        return this.stateRepository.find();
    }
}
