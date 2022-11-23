import express from 'express';
import path from 'path';

import guildsRouter from './api/api_routes/guild.routes';
import staticRouter from './api/api_routes/static.router';
import staticMembersRouter from './api/api_routes/staticMember.routes';
import { guildsService } from './api/guild/guild.service';
import { staticController } from './api/static/static.controller';
import { staticService } from './api/static/static.service';
import { staticMembersService } from './api/staticMember/staticMember.service';

const port = 3001;
const hostname = 'localhost';
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, hostname, 0, () => {
    console.log('Server is up on port: ', hostname + ':' + port);
});
const init = async () => {
    await guildsService.syncGuilds();

    await staticService.syncStatics();

    await staticMembersService.syncStaticMembers();
};
init();
// http://localhost:3001/
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

// http://localhost:3001/
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

app.use('/guilds', guildsRouter);
app.use('/statics', staticRouter);
app.use('/staticMembers', staticMembersRouter);

app.put('/addstatic/:guild_id/:static_name', async (req, res) => {
    const guild_id = req.params.guild_id;
    const static_name = req.params.static_name;
    const params = req.query; // as unknown as ;
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

// // GEARSET
// // http://localhost:3001/getgearset/1/namentest/1
// app.get('/getgearset/:name/:discord_user_id', async (req, res) => {
//     const {name, discord_user_id} = req.params;
//     if (!name || !discord_user_id) {
//         res.send('Missing id');
//         return;
//     }

//     const gear = await getGearsetFromDB(
//         name.toString(),
//         discord_user_id.toString()
//     );
//     res.send(gear);
// });

// // http://localhost:3001/addgearset?id=bd287613-ca59-45b7-b50d-5465daca9ccc&name=namentest
// app.put('/addgearset', async (req, res) => {
//     const id = req.query.id;
//     const name = req.query.name;
//     if (!id) {
//         res.send('Missing id');
//         return;
//     }
//     if (!name) {
//         res.send('Missing  name');
//         return;
//     }
//     const gearset = setGearset(id.toString(), name.toString());
//     res.send(gearset);
// });

// // USER
// // http://localhost:3001/deleteuser/1004408026922487838/
// app.delete('/deleteuser/:discord_guild_id/:discord_user_id', async (req, res) => {
//     const guild_id = req.params.discord_guild_id;
//     const moderator_role = req.query.moderator_role?.toString();
//     const best_in_slot_role = req.query.best_in_slot_role?.toString();

//     const overview_message_id = req.query.overview_message_id?.toString();
//     if (!guild_id) {
//         res.send('Missing discord_guild_id');
//         return;
//     }
//     // const guild = await editGuild(
//     //     Number(guild_id),
//     //     moderator_role,
//     //     best_in_slot_role,
//     //     overview_message_id
//     // );
//     // res.send(guild);
// });

// // ETRO
// // http://localhost:3001/etrogearset/80bec2f5-8e9e-43fb-adcf-0cd7f7018c02
// app.get('/etrogearset/:etro_id', async (req, res) => {
//     const {etro_id} = req.params;
//     if (!etro_id) {
//         res.send('Missing id');
//         return;
//     }
//     const gear = await getGearsetFromEtro(etro_id.toString());

//     res.send(gear);
// });

// // http://localhost:3001/jobs/
// app.get('/jobs/', async (req, res) => {
//     const jobs = await getJobs();

//     res.send(jobs);
// });
