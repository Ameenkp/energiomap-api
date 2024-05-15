import app from "./app";
import {logger} from "./utils/logger";
import {appConfig} from "./config/appConfig";
import dotenv from 'dotenv';
import {AppDataSource} from "./config/ormConfig";
import {CsvImporter} from "./services/csvImportService";

const csvImporter = new CsvImporter();
dotenv.config();
const port: number = <number>appConfig.port;
async function startApp() {
    try {
        await AppDataSource.initialize();
        await csvImporter.importStates();
        await csvImporter.importPlants();
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error(`An error occurred: ${error}`);

    }

}

startApp();