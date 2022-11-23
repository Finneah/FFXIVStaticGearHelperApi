import Logger from '../../utils/logger';
import { Guild } from './guild.model';
import { guildsService } from './guild.service';

const logger = Logger.child({module: 'GuildController'});

class GuildController {
    async getGuilds() {
        logger.info('Controller: getGuilds');
        return await guildsService.getGuilds();
    }
    async getGuild(guild_id: number) {
        logger.info('Controller: getGuild');

        return await guildsService.getGuild(guild_id);
    }
    async setGuild(discord_guild_id: string, moderator_role: string) {
        logger.info('Controller: setGuild');
        return await guildsService.setGuild(discord_guild_id, moderator_role);
    }
    async editGuild(
        guild: Guild,
        params: {moderator_role?: string; overview_message_id?: string}
    ) {
        logger.info('Controller: editGuild');

        if (params.moderator_role) {
            guildsService.setModeratorRole(guild, params.moderator_role);
        }
        if (params.overview_message_id) {
            guildsService.setOverviewMessageId(
                guild,
                params.overview_message_id
            );
        }
        return await guild;
    }

    async getDiscordGuildIdByGuild(guild_id: number) {
        const guild = await guildsService.getGuild(guild_id);
        return guild?.discord_guild_id || null;
    }
}
export const guildController = new GuildController();
