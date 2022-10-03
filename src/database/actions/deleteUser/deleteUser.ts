import {QueryConfig} from 'pg';

import {runQuery} from '../../database';
import Logger from '../../logger';

const logger = Logger.child({module: 'editGuildConfig'});

export const deleteUser = async (
    user_id: string,
    guild_id: string
): Promise<number> => {
    try {
        const query: QueryConfig = {
            name: 'delete-User',
            text: 'DELETE FROM bis WHERE user_id=$1 AND guild_id=$2;',
            values: [user_id, guild_id]
        };

        const res = await runQuery(query);
        logger.info(`delete-User ${JSON.stringify(res.rowCount)}`);

        return res.rowCount ?? 0;
    } catch (error) {
        return 0;
    }
};
