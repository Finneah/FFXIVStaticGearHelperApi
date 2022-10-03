import {QueryConfig} from 'pg';
import {DBGuild} from '../../../types/db.types';
import {runQuery} from '../../database';
import Logger from '../../logger';

const logger = Logger.child({module: 'dbGetGuildById'});

/**
 * @description get the DBGuild on slash command /config get
 * @param guild_id from which server should the config be returned
 * @returns Promise<DBGuild | null>
 */
export const dbGetGuildById = async (
    guild_id: string
): Promise<DBGuild | null> => {
    try {
        const query: QueryConfig = {
            name: 'get-DBGuild',
            text: 'SELECT * FROM guilds WHERE guild_id=$1;',
            values: [guild_id]
        };

        const res = await runQuery(query);
        logger.info(`get-DBGuild ${JSON.stringify(res?.rows[0])}`);
        return res?.rows[0] ?? null;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const dbGetAllGuilds = async (): Promise<DBGuild[] | null> => {
    try {
        const query: QueryConfig = {
            name: 'get-Guilds',
            text: 'SELECT * FROM guilds'
        };

        const res = await runQuery(query);
        return res?.rows ?? null;
    } catch (error) {
        return Promise.reject(error);
    }
};
