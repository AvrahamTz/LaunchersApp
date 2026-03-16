import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
config();

const app = express();
app.use(cors());
app.use(express.json());
app.use ("/api/launchers",LaunchersRoutes)
app.listen(process.env.PORT,() => {
    console.log(`server running at localhost${process.env.PORT}`);
});
