"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 3000;
const prefix = '/api';
app.use(prefix, routes_1.route);
app.use('/', (req, res) => {
    res.send('Please change the URL to find images.');
});
app.listen(port, () => {
    console.log(`Listening to server on port ${port}`);
});
exports.default = app;
