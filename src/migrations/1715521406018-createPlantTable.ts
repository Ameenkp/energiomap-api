import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlantTable1715521406018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                CREATE TABLE "plant"
                (
                    "id"                          uuid         NOT NULL PRIMARY KEY,
                    "plant_name"                   varchar(240) NOT NULL,
                    "plant_nameplate_capacity"    decimal(10, 4),
                    "plant_annual_net_generation" decimal(15, 3) DEFAULT '0.00',
                    "state_id"                     uuid         NOT NULL,
                    FOREIGN KEY ("state_id") REFERENCES "state" ("id")
                );
            `);
        } catch (error) {
            console.log(error);
    }
}

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
