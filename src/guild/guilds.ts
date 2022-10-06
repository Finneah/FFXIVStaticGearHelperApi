/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryConfig } from 'pg';

import { runQuery } from '../database';
import { User } from '../gearset/gearset.types';
import { ErrorCodes } from '../types/errorCodes.types';
import { buildQuery } from '../utils/utils';
import { guildsMock } from './guild.test.data';
import { Guild } from './guild.types';

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
    discord_guild_id: string
): Promise<Guild | undefined> => {
    try {
        //    db getGuild
        const guild = await dbGetGuildById(discord_guild_id);
        return guild;
    } catch (error: any) {
        return error;
    }
};
export const setGuild = async (
    discord_guild_id: string,
    moderator_role?: string,
    static_role?: string,
    sgh_channel_id?: string,
    overview_message_id?: string
): Promise<Guild | undefined> => {
    try {
        //    db setGuild

        await dbAddGuild(
            discord_guild_id,
            moderator_role,
            static_role,
            sgh_channel_id,
            overview_message_id
        );

        return {
            discord_guild_id,
            moderator_role,
            static_role,
            sgh_channel_id,
            overview_message_id
        };
    } catch (error: any) {
        return error;
    }
};

export const editGuild = async (
    guild_id: number,
    moderator_role?: string,
    static_role?: string,
    sgh_channel_id?: string,
    overview_message_id?: string
): Promise<Guild | undefined> => {
    try {
        //    db editGuild
        const editedGuild = guildsMock.find((g) => g.guild_id === guild_id);
        if (editedGuild) {
            if (moderator_role) {
                editedGuild.moderator_role = moderator_role;
            }
            if (static_role) {
                editedGuild.static_role = static_role;
            }
            if (sgh_channel_id) {
                editedGuild.sgh_channel_id = sgh_channel_id;
            }
            if (overview_message_id) {
                editedGuild.overview_message_id = overview_message_id;
            }
        }
        console.log(editedGuild);

        return editedGuild;
    } catch (error: any) {
        return error;
    }
};

export const getGuildUser = async (
    guild_id: number
): Promise<User[] | undefined> => {
    try {
        //    db getUserFromGuild
        const users = guildsMock.find((g) => g.guild_id === guild_id)?.users;

        return users;
    } catch (error: any) {
        return error;
    }
};

const dbGetAllGuilds = async (): Promise<Guild[] | undefined> => {
    try {
        const query: QueryConfig = {
            name: 'get-Guilds',
            text: 'SELECT * FROM guilds'
        };

        const res = await runQuery(query);
        return res?.rows;
    } catch (error) {
        return Promise.reject(error);
    }
};

const dbGetGuildById = async (
    discord_guild_id: string
): Promise<Guild | undefined> => {
    try {
        const query: QueryConfig = {
            name: 'get-DBGuild',
            text: `SELECT * FROM guilds WHERE discord_guild_id=$1;`,
            values: [discord_guild_id]
        };

        const res = await runQuery(query);

        return res?.rows[0];
    } catch (error) {
        return Promise.reject(error);
    }
};

const dbAddGuild = async (
    discord_guild_id: string,
    moderator_role?: string,
    static_role?: string,
    sgh_channel_id?: string,
    overview_message_id?: string
): Promise<void> => {
    try {
        let basicValues = [discord_guild_id];
        let basicText = `INSERT INTO guilds (
            discord_guild_id
         `;
        let basicTextValues = `)
         VALUES($1`;
        const textEnd = `);`;
        const {text, textValues, queryValues} = buildQuery(
            basicText,
            basicTextValues,
            basicValues,
            [
                'moderator_role',
                'static_role',
                'sgh_channel_id',
                'overview_message_id'
            ],
            [moderator_role, static_role, sgh_channel_id, overview_message_id],
            2
        );
        basicText = text;
        basicTextValues = textValues;
        basicValues = queryValues;

        const query: QueryConfig = {
            name: 'set-DBGuild',
            text: basicText + basicTextValues + textEnd,
            values: basicValues
        };
        console.log(query.text);

        const res = await runQuery(query);

        if (res.rowCount != 1) {
            throw ErrorCodes.DBADDGUILD;
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const dbEditGuild = async (
    discord_guild_id: string,
    moderator_role: string,
    static_role: string
): Promise<void> => {
    try {
        const query: QueryConfig = {
            name: 'edit-DBGuild',
            text: 'UPDATE guilds SET moderator_role=$1, static_role=$2 WHERE discord_guild_id=$3;',
            values: [moderator_role, static_role, discord_guild_id]
        };

        const res = await runQuery(query);
    } catch (error: any) {
        return error;
    }
};
