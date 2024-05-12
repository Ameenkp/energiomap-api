import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStateTable1715521347836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                CREATE TABLE "state"
                (
                    "id"                          uuid           NOT NULL PRIMARY KEY,
                    "state_abbreviation"                varchar(2)     NOT NULL UNIQUE,
                    "state_name"                        varchar(50)    NOT NULL UNIQUE,
                    "state_annual_net_generation" decimal(15, 4) NOT NULL,
                    "state_nameplate_capacity"    decimal(10, 3) NOT NULL,
                    "state_percentage_contribution" decimal(5, 3)  NOT NULL
                );
            `);
        } catch (error) {
            console.log(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
