import express, { Express } from "express";
import userRoutes from "./routes/router";
import cors from "cors";
import path from "path";
import serverInitialize from "./models";
import { server } from "./socket";

export const app: Express  = express();
app.use(cors(
  {origin: "*"}
));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

serverInitialize();
app.use("/users", userRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
