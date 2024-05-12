import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {State} from "./state.entity";

@Entity()
export class Plant {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: false , type: 'varchar' , length: 240 , name: 'plant_name'})
    plantName: string;

    @Column({nullable: false , name: 'plant_nameplate_capacity' , type: 'decimal', precision: 10, scale: 4})
    plantNameplateCapacityMW: number | undefined;

    @Column({nullable: true , name: 'plant_annual_net_generation' , type: 'decimal', precision: 15, scale: 3})
    plantAnnualNetGenerationMWh: number|null;

    @ManyToOne(() => State, (state: State) => state.plants , {nullable: false})
    @JoinColumn({name: 'state_id'})
    state: State;


    constructor(id: string,plantName: string, plantNameplateCapacityMW: number | undefined, plantAnnualNetGenerationMWh: number |null, state: State) {
        this.id = id;
        this.plantName = plantName;
        this.plantNameplateCapacityMW = plantNameplateCapacityMW;
        this.plantAnnualNetGenerationMWh = plantAnnualNetGenerationMWh;
        this.state = state;
    }
}