import { User } from '../gearset/gearset.types';
import { DBBis } from '../types/db.types';
import { Guild } from './guild.types';

export const usersMock: User[] = [
    {
        user_id: 1,
        discord_user_id: '378985901025394688',
        bis_ids: [1]
    }
];

export const guildsMock: Guild[] = [
    {
        guild_id: 1,
        discord_guild_id: '1004408026922487838',
        moderator_role: '1027296476386299924',
        static_role: '1027296476386299924',
        users: usersMock
    },
    {
        guild_id: 2,
        discord_guild_id: '968410103999004732',
        moderator_role: '1008007852033581106',
        static_role: '1008008105650569268',
        users: usersMock
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
