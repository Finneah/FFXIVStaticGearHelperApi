import { guildService } from '../services/GuildService';
import Logger from '../utils/logger';

const logger = Logger.child({module: 'GuildController'});

class GuildController {
    async getGuilds() {
        logger.info('Controller: getGuilds');
        return await guildService.getGuilds();
    }
    async getGuild(guild_id: string) {
        logger.info('Controller: getGuild');
        return await guildService.getGuild(guild_id);
    }
    async setGuild(discord_guild_id: string, moderator_role: string) {
        logger.info('Controller: setGuild');
        return await guildService.setGuild(discord_guild_id, moderator_role);
    }
    async editGuild(
        guild_id: string,
        params: {moderator_role?: string; overview_message_id?: string}
    ) {
        logger.info('Controller: editGuild');

        const guild = await this.getGuild(guild_id);

        if (guild && params.moderator_role) {
            guildService.setModeratorRole(guild, params.moderator_role);
        }
        if (guild && params.overview_message_id) {
            guildService.setModeratorRole(guild, params.overview_message_id);
        }
        return await guild;
    }
}
export const guildController = new GuildController();
