import express, {Request, Response, Router} from 'express';
import { StateController } from '../controllers/stateController';

const router:Router = express.Router();
const stateController   :StateController = new StateController();

router.get('/', (req: Request, res: Response) => stateController.getAllStates(req, res));

export default router;
