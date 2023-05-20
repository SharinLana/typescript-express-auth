"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({ keys: ["sdfdfgsfg"] }));
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use("/", loginRoutes_1.default);
const start = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
start();
