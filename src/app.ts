import express, { Request, Response } from "express";
import config from "./app/config";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.routes";
import notFoundRoute from "./app/middleware/notFound";
import { BikeRoutes } from "./app/modules/bike/bike.routes";
import { BookingRoutes } from "./app/modules/booking/booking.routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

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
app.use("/api", BikeRoutes);
app.use("/api", BookingRoutes);

//unmatched route
app.use(notFoundRoute);

//globalErrorHandler
app.use(globalErrorHandler);

// app.get("/", (req: Request, res: Response) => {
//   res.send(`Server is running on port ${config.port}`);
// });

export default app;
