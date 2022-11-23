import express from 'express';

import { userBisApi } from '../userBis/userBis.api';

const userBisRouter = express.Router();

// userBissRouter.use(function timeLog(req, res, next) {
//     console.log(res);
//     next();
// });

// GET http://localhost:3001/userBis/
userBisRouter.get('/', (req, res) => userBisApi.getUserBisAll(res));

// GET http://localhost:3001/userBis/1
userBisRouter.get('/:bis_id', (req, res) => userBisApi.getUserBis(req, res));

// POST http://localhost:3001/userBis/1/1028091555598323700/Test/e78a29e3-1dcf-4e53-bbcf-234f33b2c831
userBisRouter.post(
    '/:guild_id/:user_discord_id/:bis_name/:etro_id',
    (req, res) => userBisApi.setUserBis(req, res)
);

// PUT http://localhost:3001/userBis/1?weapon=true&body=true
userBisRouter.put('/:bis_id/', (req, res) => userBisApi.editUserBis(req, res));

// DELETE http://localhost:3001/userBis/1
userBisRouter.delete('/:bis_id', (req, res) =>
    userBisApi.deleteUserBis(req, res)
);

export default userBisRouter;
