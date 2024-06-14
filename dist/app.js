"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./app/config"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./app/user/user.routes");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// root route message
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Bike Rental Reservation System!",
    });
});
//routes
app.use("/api", user_routes_1.UserRoutes);
app.get("/", (req, res) => {
    res.send(`Server is running on port ${config_1.default.port}`);
});
exports.default = app;
