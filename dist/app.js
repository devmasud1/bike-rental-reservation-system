"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5000",
        "https://bike-rental-service-azure-seven.vercel.app/",
        "https://bike-rental-service-muuplo3is-md-masuds-projects.vercel.app/",
    ],
}));
// root route message
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Bike Rental Reservation System!",
    });
});
//routes
app.use("/api", routes_1.default);
//globalErrorHandler
app.use(globalErrorHandler_1.default);
//unmatched route
app.use(notFound_1.default);
exports.default = app;
