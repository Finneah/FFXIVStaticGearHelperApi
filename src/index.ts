import express from 'express';
import path from 'path';
import {Gearset} from './getGearset/gearset.class';

const gearset = new Gearset();
const port = 3001;
const hostname = 'localhost';
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, hostname, 0, () => {
    console.log('Server is up on port: ', port, hostname);
});

app.get('/', (req, res) => {
    res.send(req.query.search);
});

app.get('/gearset/:id', async (req, res) => {
    const {id} = req.params;
    const gear = await gearset.getGearset(id);

    res.send(gear);
});
