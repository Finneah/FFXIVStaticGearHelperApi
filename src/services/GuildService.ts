import { guildsRelation } from '../database/guild/GuildsRelation';
import { Guild } from '../models/Guilds';

class GuildService {
    async getGuilds() {
        return await guildsRelation.getGuilds();
    }
    async getGuild(guild_id: string) {
        return await guildsRelation.getGuild(guild_id);
    }
    async setGuild(discord_guild_id: string, moderator_role: string) {
        return await guildsRelation.setGuild(discord_guild_id, moderator_role);
    }

    async setModeratorRole(guild: Guild, moderator_role: string) {
        return await guildsRelation.setModeratorRole(guild, moderator_role);
    }
    async getModeratorRole(guild: Guild) {
        return await guildsRelation.getModeratorRole(guild);
    }
    async setOverviewMessageId(guild: Guild, overview_message_id: string) {
        return await guildsRelation.setOverviewMessageId(
            guild,
            overview_message_id
        );
    }
    async getOverviewMessageId(guild: Guild) {
        return await guildsRelation.getOverviewMessageId(guild);
    }
}

export const guildService = new GuildService();
