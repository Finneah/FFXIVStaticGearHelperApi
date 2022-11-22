import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import path from 'path';

import { getGearsetFromDB, getGearsetFromEtro, setGearset } from './database/gearset/gearsets';
import { editGuild, getGuild, getGuilds, setGuild } from './database/guild/GuildsRelation';
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
/**
 * RULE
 * Always send with discord_id for validation. If Discord_id is not set => nothing
 */
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

// http://localhost:3001/guilds/
app.get('/guilds/', async (req, res) => {
    const guilds = await getGuilds();

    res.send(guilds);
});

// http://localhost:3001/guild/1
app.get('/guild/:guild_id', async (req, res) => {
    const guild_id = req.params.guild_id;
    if (!guild_id) {
        res.send('Missing guild_id');
    }

    const guild = await getGuild(guild_id);
    res.send(guild);
});

// http://localhost:3001/addguild/1004408026922487838/1028091555598323722
app.get('/addguild/:discord_guild_id/:moderator_role', async (req, res) => {
    const params = req.query as unknown as GuildParams;

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
    const guild = await setGuild({...params, discord_guild_id, moderator_role});

    res.send(guild);
});

// http://localhost:3001/editguild/2?best_in_slot_role=1028091555598323722
app.get('/editguild/:guild_id', async (req, res) => {
    const params = req.query as unknown as GuildParams;
    const guild_id = req.params.guild_id;
    if (!guild_id) {
        res.send('Missing Guild Id');
        return;
    }
    const guild = await editGuild({...params, guild_id});
    res.send(guild);
});

// http://localhost:3001/getstatics/2
app.get('/getstatics/:guild_id', async (req, res) => {
    const params = req.query as unknown as GuildParams;
    const guild_id = req.params.guild_id;
    if (!guild_id) {
        res.send('Missing Guild Id');
        return;
    }

    res.send({guild_id, ...params});
});

// http://localhost:3001/getstatic/1
app.get('/getstatic/:static_id', async (req, res) => {
    const params = req.query as unknown as GuildParams;
    const static_id = req.params.static_id;
    if (!static_id) {
        res.send('Missing Static Id');
        return;
    }

    res.send({static_id, ...params});
});

// http://localhost:3001/setstatic/2/the professionels
app.get('/setstatic/:guild_id/:static_name', async (req, res) => {
    const params = req.query as unknown as GuildParams;
    const guild_id = req.params.guild_id;
    const static_name = req.params.static_name;
    if (!guild_id) {
        res.send('Missing Guild Id');
        return;
    }
    if (!static_name) {
        res.send('Missing Static Name');
        return;
    }

    res.send({guild_id, static_name, ...params});
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

// http://localhost:3001/jobs/
app.get('/jobs/', async (req, res) => {
    const jobs = await getJobs();

    res.send(jobs);
});

// // http://localhost:3001/deleteuser/1004408026922487838/
// app.get('/deleteuser/:discord_guild_id/:discord_user_id', async (req, res) => {
//     const guild_id = req.params.discord_guild_id;
//     const moderator_role = req.query.moderator_role?.toString();
//     const best_in_slot_role = req.query.best_in_slot_role?.toString();

//     const overview_message_id = req.query.overview_message_id?.toString();
//     if (!guild_id) {
//         res.send('Missing discord_guild_id');
//         return;
//     }
//     const guild = await editGuild(
//         Number(guild_id),
//         moderator_role,
//         best_in_slot_role,
//         overview_message_id
//     );
//     res.send(guild);
// });
