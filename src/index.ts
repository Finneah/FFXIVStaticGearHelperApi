import express from 'express';
import path from 'path';

import { getGearsetFromDB, getGearsetFromEtro, setGearset } from './gearset/gearsets';
import { editGuild, getGuild, getGuilds, getGuildUser, setGuild } from './guild/guilds';
import { getJobs } from './jobs/jobs';

const port = 3001;
const hostname = 'localhost';
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, hostname, 0, () => {
    console.log('Server is up on port: ', hostname + ':' + port);
});

app.get('/', (req, res) => {
    res.send(req.query.search);
});

// http://localhost:3001/gearset/bd287613-ca59-45b7-b50d-5465daca9ccc
app.get('/etrogearset/:etro_id', async (req, res) => {
    const {etro_id} = req.params;
    if (!etro_id) {
        res.send('Missing id');
        return;
    }
    const gear = await getGearsetFromEtro(etro_id.toString());

    res.send(gear);
});
// http://localhost:3001/getgearset/1/namentest/1
app.get('/getgearset/:name/:discord_user_id', async (req, res) => {
    const {name, discord_user_id} = req.params;
    if (!name || !discord_user_id) {
        res.send('Missing id');
        return;
    }

    const gear = await getGearsetFromDB(
        name.toString(),
        discord_user_id.toString()
    );
    res.send(gear);
});

// http://localhost:3001/setgearset?id=bd287613-ca59-45b7-b50d-5465daca9ccc&name=namentest
app.get('/setgearset', async (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    if (!id) {
        res.send('Missing id');
        return;
    }
    if (!name) {
        res.send('Missing  name');
        return;
    }
    const gearset = setGearset(id.toString(), name.toString());
    res.send(gearset);
});

// http://localhost:3001/jobs/
app.get('/jobs/', async (req, res) => {
    const jobs = await getJobs();

    res.send(jobs);
});

// http://localhost:3001/guilds/
app.get('/guilds/', async (req, res) => {
    const guilds = await getGuilds();

    res.send(guilds);
});

// http://localhost:3001/guild/1004408026922487838
app.get('/guild/:discord_guild_id', async (req, res) => {
    const discord_guild_id = req.params.discord_guild_id;
    if (!discord_guild_id) {
        res.send('Missing guild_id or discord_guild_id');
    }

    const guild = await getGuild(discord_guild_id.toString());
    res.send(guild);
});

// http://localhost:3001/setguild?discord_guild_id=1234&moderator_role=1008007852033581106&static_role=1008008105650569268&overview_message_id=123
app.get('/setguild', async (req, res) => {
    const discord_guild_id = req.query.discord_guild_id;
    const moderator_role = req.query.moderator_role?.toString();
    const static_role = req.query.static_role?.toString();
    const sgh_channel_id = req.query.sgh_channel_id?.toString();
    const overview_message_id = req.query.overview_message_id?.toString();
    if (!discord_guild_id) {
        res.send('Missing Guild_id');
        return;
    }
    console.log(overview_message_id);

    const guild = await setGuild(
        discord_guild_id.toString(),
        moderator_role,
        static_role,
        sgh_channel_id,
        overview_message_id
    );

    res.send(guild);
});

// http://localhost:3001/editguild?guild_id=1&moderator_role=1234&static_role=1234
app.get('/editguild', async (req, res) => {
    const guild_id = req.query.guild_id;
    const moderator_role = req.query.moderator_role?.toString();
    const static_role = req.query.static_role?.toString();
    const sgh_channel_id = req.query.sgh_channel_id?.toString();
    const overview_message_id = req.query.overview_message_id?.toString();
    if (!guild_id) {
        res.send('Missing Guild_id');
        return;
    }
    const guild = await editGuild(
        Number(guild_id),
        moderator_role,
        static_role,
        sgh_channel_id,
        overview_message_id
    );
    res.send(guild);
});

// http://localhost:3001/getguilduser/1
app.get('/getguilduser/:guild_id', async (req, res) => {
    const guild = await getGuildUser(Number(req.params.guild_id));

    res.send(guild);
});
