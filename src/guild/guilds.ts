/* eslint-disable @typescript-eslint/no-explicit-any */

import { buildInsertQuery, buildSelectQuery, buildUpdateQuery, runQuery } from '../database';
import { ErrorCodes } from '../types/errorCodes.types';
import { Guild, GuildParams } from './guild.types';

export const getGuilds = async (): Promise<Guild[] | undefined> => {
    try {
        //db get Guilds
        const guilds = await dbGetAllGuilds();

        return guilds;
    } catch (error: any) {
        return error;
    }
};
// 1004408026922487838 6
export const getGuild = async (
    guild_id: string
): Promise<Guild | undefined> => {
    try {
        //    db getGuild

        const guild = await dbGetGuildById(guild_id);
        return guild;
    } catch (error: any) {
        return error;
    }
};

export const setGuild = async (
    params: GuildParams
): Promise<Guild | undefined> => {
    try {
        //    db setGuild

        const guild = await dbAddGuild(params);
        return guild;
    } catch (error: any) {
        return error;
    }
};

export const editGuild = async (
    params: GuildParams
): Promise<Guild | undefined> => {
    try {
        //    db editGuild
        const guild = await dbEditGuild(params);

        return guild;
    } catch (error: any) {
        return error;
    }
};

const dbGetAllGuilds = async (): Promise<Guild[] | undefined> => {
    try {
        const query = buildSelectQuery('guilds', 'get-Guilds');

        const res = await runQuery(query);
        return res?.rows;
    } catch (error) {
        return Promise.reject(error);
    }
};

const dbGetGuildById = async (guild_id: string): Promise<Guild | undefined> => {
    try {
        if (!guild_id) {
            throw 'Missing Guild id';
        }

        const query = buildSelectQuery('guilds', 'get-Guild', {
            guild_id
        });

        const res = await runQuery(query);

        return res?.rows[0];
    } catch (error) {
        return Promise.reject(error);
    }
};

const dbAddGuild = async (params: GuildParams): Promise<Guild> => {
    try {
        const {discord_guild_id, moderator_role} = params;
        if (!discord_guild_id) {
            throw 'Missing discord id';
        }
        if (!moderator_role) {
            throw 'Missing Moderator Role';
        }
        const query = buildInsertQuery('guilds', 'set-Guild', params);

        const res = await runQuery(query);
        console.log(res, res.rows);
        if (res.rowCount != 1) {
            throw ErrorCodes.DBADDGUILD;
        }
        return res.rows[0];
    } catch (error) {
        return Promise.reject(error);
    }
};

const dbEditGuild = async (params: GuildParams): Promise<Guild> => {
    try {
        const {
            guild_id,
            moderator_role,
            best_in_slot_role,
            overview_message_id
        } = params;
        if (!guild_id) {
            throw 'Missing guild id';
        }
        const query = buildUpdateQuery(
            'guilds',
            'edit-Guild',
            {guild_id: guild_id.toString()},
            {
                moderator_role,
                best_in_slot_role,
                overview_message_id
            }
        );

        const res = await runQuery(query);

        if (res.rowCount != 1) {
            throw ErrorCodes.DBEDITGUILD;
        }
        return res.rows[0];
    } catch (error: any) {
        return error;
    }
};
