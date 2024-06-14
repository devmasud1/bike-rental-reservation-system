"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
// root route message
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Bike Rental Services!",
    });
});
//routes
// app.use("/api/bike");
app.get("/", (req, res) => {
    res.send(`Server is running on port ${config_1.default.port}`);
});
exports.default = app;
