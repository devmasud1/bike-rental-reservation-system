import express, { Request, Response } from "express";
import config from "./app/config";
import cors from "cors";
import { UserRoutes } from "./app/user/user.routes";

const app = express();

//parser
app.use(express.json());
app.use(cors());

// root route message
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Bike Rental Reservation System!",
  });
});

//routes
app.use("/api", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running on port ${config.port}`);
});

export default app;
