import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Plant} from "./plant.entity";

@Entity()
export class State {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, length: 2, unique: true, type: 'varchar', name: 'state_abbreviation'})
    abbreviation: string;

    @Column({nullable: false, type: 'varchar', length: 50, unique: true, name: 'state_name'})
    name: string;

    @Column({nullable: false, type: 'decimal', name: 'state_annual_net_generation', precision: 15, scale: 4})
    stateAnnualNetGenerationMWh: number;

    @Column({nullable: false, name: 'state_nameplate_capacity', type: 'decimal', precision: 10, scale: 3})
    stateNameplateCapacityMW: number;

    @Column({nullable: false, name: 'state_percentage_contribution', type: 'decimal', precision: 5, scale: 3})
    statePercentageContribution: number;

    @OneToMany(() => Plant, (plant: Plant) => plant.state, {nullable: false})
    plants!: Plant[];


    constructor(id: string, abbreviation: string, name: string, stateAnnualNetGenerationMWh: number, stateNameplateCapacityMW: number, statePercentageContribution: number) {
        this.id = id;
        this.abbreviation = abbreviation;
        this.name = name;
        this.stateAnnualNetGenerationMWh = stateAnnualNetGenerationMWh;
        this.stateNameplateCapacityMW = stateNameplateCapacityMW;
        this.statePercentageContribution = statePercentageContribution;
    }


}