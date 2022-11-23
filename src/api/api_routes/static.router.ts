import express from 'express';

import { staticApi } from '../static/static.api';

const staticRouter = express.Router();

// GET http://localhost:3001/statics/
staticRouter.get('/', (req, res) => {
    staticApi.getStatics(res);
});

// GET http://localhost:3001/statics/3
staticRouter.get('/:static_id', (req, res) => staticApi.getStatic(req, res));

// POST http://localhost:3001/statics/1/das etwas/?members_count=4
staticRouter.post('/:guild_id/:static_name', (req, res) =>
    staticApi.setStatic(req, res)
);
// PUT http://localhost:3001/statics/1?members_count=8
staticRouter.put('/:static_id', (req, res) => staticApi.editStatic(req, res));

// DELETE http://localhost:3001/statics/1
staticRouter.delete('/:static_id', (req, res) =>
    staticApi.deleteStatic(req, res)
);
export default staticRouter;
