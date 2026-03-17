import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import LaunchersRoutes from './routers/launchers.routes.js'
import authRouters from './routers/auth.routes.js'
config();

const app = express();
app.use(cors());
app.use(express.json());
app.use ("/api/launchers",LaunchersRoutes)
app.use("/api/auth",authRouters)
app.listen(process.env.PORT,() => {
    console.log(`server running at localhost${process.env.PORT}`);
});
