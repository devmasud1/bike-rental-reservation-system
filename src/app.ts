import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoute from "./app/middleware/notFound";
import router from "./app/routes";

const app = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://bike-rental-service-azure-seven.vercel.app/",
      "https://bike-rental-service-muuplo3is-md-masuds-projects.vercel.app/",
    ],
  })
);

// root route message
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Bike Rental Reservation System!",
  });
});

//routes
app.use("/api", router);

//globalErrorHandler
app.use(globalErrorHandler);

//unmatched route
app.use(notFoundRoute);

export default app;
