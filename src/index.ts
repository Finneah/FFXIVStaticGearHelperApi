import express from 'express';
import path from 'path';
import {Gearset} from './gearset/gearset.class';
import {Jobs} from './jobList/jobList.class';

const gearset = new Gearset();
const joblist = new Jobs();
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

// http://localhost:3001/getgearset/bd287613-ca59-45b7-b50d-5465daca9ccc
app.get('/getgearset/:id', async (req, res) => {
    const {id} = req.params;
    const gear = await gearset.getGearset(id);

    res.send(gear);
});
// http://localhost:3001/getgearset/bd287613-ca59-45b7-b50d-5465daca9ccc/namentest
app.get('/getgearset/:id/:name', async (req, res) => {
    const {id} = req.params;
    const gear = await gearset.getGearset(id);
    res.send(gear);
});

// http://localhost:3001/setgearset/bd287613-ca59-45b7-b50d-5465daca9ccc/namentest
app.get('/setgearset/:id/:name', async (req, res) => {
    const {id, name} = req.params;
    res.send(req.params);
});

// http://localhost:3001/jobs/
app.get('/jobs/', async (req, res) => {
    const jobs = await joblist.getJobs();

    res.send(jobs);
});
