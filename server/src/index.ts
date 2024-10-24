import express, { Express, Request, Response } from 'express';
import serverInitialize from './models';
import userRoutes from "./routes/user.routes"
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { socketServerInitialization } from './socket';
import cors from "cors";
// import { server } from './socket';

export const app: Express  = express();

const server = createServer(app);
socketServerInitialization(server);

app.use(bodyParser.json());
app.use(cors({origin: "*"}))

const port = 4000;
app.use("/users",userRoutes);

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

serverInitialize();




