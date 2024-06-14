import express, { Request, Response } from "express";

import config from "./config";
const app = express();

//parser
app.use(express.json());

// root route message
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Bike Rental Reservation System!",
  });
});

//routes

app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running on port ${config.port}`);
});

export default app;
