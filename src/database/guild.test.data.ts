import { Guild } from '../api/guild/guild.types';
import { DBBis } from '../models/db.types';

export const guildsMock: Guild[] = [
    {
        guild_id: 1,
        discord_guild_id: '1004408026922487838',
        moderator_role: '1027296476386299924'
    },
    {
        guild_id: 2,
        discord_guild_id: '968410103999004732',
        moderator_role: '1008007852033581106'
    }
];

export const bisMock: DBBis[] = [
    {
        bis_id: 1,
        gearset_id: 1,
        user_id: 1,
        bis_name: 'test'
    }
];
