import express, { Express, Request, Response } from 'express';
import serverInitialize from './models';
// import userRoutes from "./routes/userRoutes"
import bodyParser from 'body-parser';
import cors from "cors";

const app: Express  = express();

app.use(cors(
    {origin: "*"}
));
app.use(bodyParser.json());

const port = 5000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

serverInitialize();

// app.use("/", userRoutes);


