"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const gearset_class_1 = require("./getGearset/gearset.class");
const gearset = new gearset_class_1.Gearset();
const port = 3001;
const hostname = 'localhost';
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.listen(port, hostname, 0, () => {
    console.log('Server is up on port: ', port, hostname);
});
app.get('/', (req, res) => {
    res.send(req.query.search);
});
app.get('/gearset/:id', async (req, res) => {
    const { id } = req.params;
    const gear = await gearset.getGearset(id);
    res.send(gear);
});
