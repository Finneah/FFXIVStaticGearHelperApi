import express from 'express';

import { staticMemberApi } from '../staticMember/staticMember.api';

const staticMembersRouter = express.Router();

// staticMembersRouter.use(function timeLog(req, res, next) {
//     console.log(res);
//     next();
// });

// GET http://localhost:3001/staticMembers/
staticMembersRouter.get('/', (req, res) =>
    staticMemberApi.getStaticMembers(res)
);
// GET http://localhost:3001/staticMembers/1
staticMembersRouter.get('/:static_id', (req, res) =>
    staticMemberApi.getStaticMembersByStatic(req, res)
);

// POST http://localhost:3001/staticMembers/1/1028091555598323700
staticMembersRouter.post('/:static_id/:user_discord_id', (req, res) =>
    staticMemberApi.setStaticMember(req, res)
);

// PUT http://localhost:3001/staticMembers/1/1
staticMembersRouter.put('/:static_member_id/:main_bis_id', (req, res) =>
    staticMemberApi.editStaticMember(req, res)
);

// DELETE http://localhost:3001/staticMembers/1
staticMembersRouter.delete('/:static_member_id', (req, res) =>
    staticMemberApi.deleteStaticMember(req, res)
);

export default staticMembersRouter;
