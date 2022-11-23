import { ErrorCodes } from '../APIErrorHandler';
import { Guild } from './guild.model';

class GuildsService {
    async syncGuilds() {
        await Guild.sync();
    }
    async getGuilds(): Promise<Guild[] | null> {
        try {
            const guilds = await Guild.findAll();
            return Promise.resolve(guilds);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getGuild(guild_id: number): Promise<Guild | null> {
        try {
            if (!guild_id) {
                throw 'Missing Guild Id';
            }
            const guildModel = await Guild.findByPk(guild_id);

            return guildModel;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getGuildByDiscordGuildId(
        discord_guild_id: string
    ): Promise<Guild | null> {
        try {
            return await Guild.findOne({where: {discord_guild_id}});
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setGuild(
        discord_guild_id: string,
        moderator_role: string
    ): Promise<Guild | null> {
        try {
            const exist = await this.getGuildByDiscordGuildId(discord_guild_id);
            if (exist) {
                throw {
                    code: ErrorCodes.STATIC_EXIST,
                    message: `Server "${discord_guild_id}" existiert bereits.`
                };
            }
            return await Guild.create({
                discord_guild_id,
                moderator_role
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async setModeratorRole(
        guildModel: Guild,
        moderator_role: string
    ): Promise<Guild | null> {
        try {
            await guildModel.setDataValue('moderator_role', moderator_role);
            return await guildModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getModeratorRole(guildModel: Guild): Promise<Guild | null> {
        try {
            return await guildModel.getDataValue('moderator_role');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setOverviewMessageId(
        guildModel: Guild,
        overview_message_id: string
    ): Promise<Guild | null> {
        try {
            await guildModel.setDataValue(
                'overview_message_id',
                overview_message_id
            );
            return await guildModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getOverviewMessageId(guildModel: Guild): Promise<Guild | null> {
        try {
            return await guildModel.getDataValue('overview_message_id');
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const guildsService = new GuildsService();
