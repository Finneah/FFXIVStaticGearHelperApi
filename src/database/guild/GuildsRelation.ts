/* eslint-disable @typescript-eslint/no-explicit-any */

import { Guild } from '../../models/Guilds';

class GuildsRelation {
    constructor() {
        this.syncGuilds();
    }
    private async syncGuilds() {
        await Guild.sync();
    }
    async getGuilds() {
        try {
            return await Guild.findAll();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getGuild(guild_id: string) {
        try {
            if (!guild_id) {
                throw 'Missing Guild id';
            }

            return await Guild.findByPk(guild_id);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setGuild(discord_guild_id: string, moderator_role: string) {
        try {
            return await Guild.create({
                discord_guild_id,
                moderator_role
            });
        } catch (error) {
            return error;
        }
    }
    async setModeratorRole(guild: Guild, moderator_role: string) {
        try {
            await guild.setDataValue('moderator_role', moderator_role);
            return await guild.save();
        } catch (error) {
            return error;
        }
    }
    async getModeratorRole(guild: Guild) {
        try {
            return await guild.getDataValue('moderator_role');
        } catch (error) {
            return error;
        }
    }
    async setOverviewMessageId(guild: Guild, overview_message_id: string) {
        try {
            await guild.setDataValue(
                'overview_message_id',
                overview_message_id
            );
            return await guild.save();
        } catch (error) {
            return error;
        }
    }
    async getOverviewMessageId(guild: Guild) {
        try {
            return await guild.getDataValue('overview_message_id');
        } catch (error) {
            return error;
        }
    }
}

export const guildsRelation = new GuildsRelation();
