import express from 'express';

import { guildApi } from '../guild/guild.api';

const guildsRouter = express.Router();

// GET http://localhost:3001/guilds/
guildsRouter.get('/', (req, res) => guildApi.getGuilds(res));

// GET http://localhost:3001/guilds/1
guildsRouter.get('/:guild_id', (req, res) => {
    guildApi.getGuild(req, res);
});

// POST http://localhost:3001/guilds/1004408026922487838?moderator_role=1029440164428267591
guildsRouter.post('/:discord_guild_id', (req, res) => {
    guildApi.setGuild(req, res);
});

// PUT http://localhost:3001/guilds/1?moderator_role=1045010249129676941
guildsRouter.put('/:guild_id', (req, res) => {
    guildApi.editGuild(req, res);
});

// DELETE http://localhost:3001/guilds/1
guildsRouter.delete('/:guild_id', (req, res) => guildApi.deleteGuild(req, res));

export default guildsRouter;
