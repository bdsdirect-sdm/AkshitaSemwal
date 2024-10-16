import express, { Express, Request, Response } from 'express';
import serverInitialize from './models';
// import userRoutes from "./routes/userRoutes"
import bodyParser from 'body-parser';
import socketServer from './socket/index';
import cors from "cors";

export const app: Express  = express();
import * as dotenv from "dotenv";

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;
socketServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

serverInitialize()

// app.use("/", userRoutes);


