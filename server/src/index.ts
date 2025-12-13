import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";

import songRoutes from "./routes/songRoutes";

dotenv.config();

connectDB();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Music manager server running");
});

app.use("/api/songs", songRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
