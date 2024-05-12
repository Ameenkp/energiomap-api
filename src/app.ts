
import express, {Express} from "express";
import { errorHandler } from "./middlewares/errorHandler";
import plantRoutes from "./routes/plantRoutes";
import stateRoutes from "./routes/stateRoutes";

const app:Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/states', stateRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
