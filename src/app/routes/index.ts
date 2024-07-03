import { Router } from "express";
import { UserRoutes, AuthRouter } from "../modules/user/user.routes";
import { BikeRoutes } from "../modules/bike/bike.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/bikes",
    route: BikeRoutes,
  },
  {
    path: "/rentals",
    route: BookingRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
