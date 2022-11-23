import express from 'express';
import path from 'path';

import { guildController } from './controller/GuildController';
import { staticController } from './controller/StaticController';
import { getGearsetFromDB, getGearsetFromEtro, setGearset } from './database/gearset/gearsets';
import { getJobs } from './database/jobs/jobs';
import { GuildParams } from './types/guild.types';

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

// GUILDS
// http://localhost:3001/guilds/
app.get('/guilds/', async (req, res) => {
    guildController.getGuilds().then((data) => res.json(data));
});

// http://localhost:3001/guild/1
app.get('/guild/:guild_id', async (req, res) => {
    const guild_id = req.params.guild_id;
    if (!guild_id) {
        res.send('Missing guild_id');
    }

    guildController.getGuild(guild_id).then((data) => res.json(data));
});

// http://localhost:3001/addguild/1004408026922487838/1028091555598323722
app.get('/addguild/:discord_guild_id/:moderator_role', async (req, res) => {
    const discord_guild_id = req.params.discord_guild_id;
    const moderator_role = req.params.moderator_role;
    if (!discord_guild_id) {
        res.send('Missing discord_guild_id');
        return;
    }

    if (!moderator_role) {
        res.send('Missing moderator_role');
        return;
    }
    guildController
        .setGuild(discord_guild_id, moderator_role)
        .then((data) => res.json(data));
});

// http://localhost:3001/editguild/1?moderator_role=1028091555598323700
app.get('/editguild/:discord_guild_id/:guild_id', async (req, res) => {
    const params = req.query as unknown as GuildParams;
    const guild_id = req.params.guild_id;
    if (!guild_id) {
        res.send('Missing Guild Id');
        return;
    }
    guildController.editGuild(guild_id, params).then((data) => res.json(data));
});

// STATIC
// http://localhost:3001/statics/
app.get('/statics/', async (req, res) => {
    staticController.getStatics().then((data) => res.json(data));
});

// http://localhost:3001/static/1
app.get('/static/:static_id', async (req, res) => {
    const params = req.query as unknown as GuildParams;
    const static_id = req.params.static_id;
    if (!static_id) {
        res.send('Missing Static Id');
        return;
    }

    res.send({static_id, ...params});
});

// http://localhost:3001/setstatic/2/"the professionels"/?members_count=4
app.get('/addstatic/:guild_id/:static_name', async (req, res) => {
    const guild_id = req.params.guild_id;
    const static_name = req.params.static_name;
    const params = req.query as unknown as GuildParams;
    if (!guild_id) {
        res.send('Missing guild_id');
        return;
    }

    if (!static_name) {
        res.send('Missing static_name');
        return;
    }
    staticController
        .setStatic(parseInt(guild_id), static_name, params)
        .then((data) => res.json(data));
});

// GEARSET
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

// http://localhost:3001/addgearset?id=bd287613-ca59-45b7-b50d-5465daca9ccc&name=namentest
app.get('/addgearset', async (req, res) => {
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

// USER
// http://localhost:3001/deleteuser/1004408026922487838/
app.get('/deleteuser/:discord_guild_id/:discord_user_id', async (req, res) => {
    const guild_id = req.params.discord_guild_id;
    const moderator_role = req.query.moderator_role?.toString();
    const best_in_slot_role = req.query.best_in_slot_role?.toString();

    const overview_message_id = req.query.overview_message_id?.toString();
    if (!guild_id) {
        res.send('Missing discord_guild_id');
        return;
    }
    // const guild = await editGuild(
    //     Number(guild_id),
    //     moderator_role,
    //     best_in_slot_role,
    //     overview_message_id
    // );
    // res.send(guild);
});

// ETRO
// http://localhost:3001/etrogearset/80bec2f5-8e9e-43fb-adcf-0cd7f7018c02
app.get('/etrogearset/:etro_id', async (req, res) => {
    const {etro_id} = req.params;
    if (!etro_id) {
        res.send('Missing id');
        return;
    }
    const gear = await getGearsetFromEtro(etro_id.toString());

    res.send(gear);
});

// http://localhost:3001/jobs/
app.get('/jobs/', async (req, res) => {
    const jobs = await getJobs();

    res.send(jobs);
});
