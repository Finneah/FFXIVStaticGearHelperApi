import { QueryConfig } from 'pg';

import { runQuery } from '../../../database';
import { Guild } from '../../../guild/guild.types';
import Logger from '../../logger';

const logger = Logger.child({module: 'dbUpdateGuild'});

/**
 * @description edit the DBGuild on slash command /config set override
 * @param guild GuildConfigType
 */
export const dbUpdateGuild = async (guild: Guild): Promise<void> => {
    try {
        const {discord_guild_id, moderator_role, static_role} = guild;
        const query: QueryConfig = {
            name: 'update-DBGuild',
            text: 'UPDATE guilds SET moderator_role=$1, static_role=$2 WHERE discord_guild_id=$3;',
            values: [moderator_role, static_role, discord_guild_id]
        };

        const res = await runQuery(query);
        logger.info(`update-DBGuild ${JSON.stringify(res?.rows[0])}`);
    } catch (error: any) {
        return error;
    }
};

/**
 * @todo bis_channel
 * @description save the DBGuild on slash command /config set
 * @param guildConfig GuildConfigTyle
 */
export const dbUpdateGuildMessageId = async (
    bis_message_id: string,
    discord_guild_id: string
): Promise<void> => {
    try {
        const query: QueryConfig = {
            name: 'update-DBGuild',
            text: 'UPDATE guilds SET bis_message_id=$1 WHERE discord_guild_id=$2',
            values: [bis_message_id, discord_guild_id]
        };

        const res = await runQuery(query);
        logger.info(`update-DBGuild ${JSON.stringify(res?.rows)}`);
    } catch (error) {
        return Promise.reject(error);
    }
};
