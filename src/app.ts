import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoute from "./app/middleware/notFound";
import { UserRoutes } from "./app/modules/user/user.routes";
import { BikeRoutes } from "./app/modules/bike/bike.routes";
import { BookingRoutes } from "./app/modules/booking/booking.routes";

const app = express();
//{ origin: ["http://localhost:5000"] }
//parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// root route message
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Bike Rental Reservation System!",
  });
});

//routes
app.use("/api", UserRoutes);
app.use("/api", BikeRoutes);
app.use("/api", BookingRoutes);

//unmatched route
app.use(notFoundRoute);

//globalErrorHandler
app.use(globalErrorHandler);

export default app;
