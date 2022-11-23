import { Request, Response } from 'express';

import { API } from '../API';
import { ErrorCodes } from '../APIErrorHandler';
import { guildController } from './guild.controller';
import { Guild } from './guild.model';
import { GuildParams } from './guild.types';

class GuildAPI extends API {
    constructor() {
        super('GuildAPI');
    }
    async getGuilds(res: Response) {
        guildController.getGuilds().then((data) => res.json(data));
    }
    async getGuild(req: Request, res: Response) {
        const guild_id = req.params.guild_id;
        const headerKey = req.headers.key as unknown as string;
        if (!guild_id) {
            res.send('Missing Guild Id');
            return;
        }

        guildController
            .getGuild(parseInt(guild_id))
            .then(async (data) => {
                super.withPermissionCheck(
                    data?.discord_guild_id || '',
                    headerKey,
                    res,
                    () => res.json(data)
                );
            })
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }

    async setGuild(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const params = req.query as unknown as GuildParams;
        const discord_guild_id = req.params.discord_guild_id;
        const moderator_role = params.moderator_role;

        if (!discord_guild_id) {
            super.getError(
                res,
                ErrorCodes.MISSING_PARAM,
                'Missing Discord Guild Id'
            );
            return;
        }

        if (!moderator_role) {
            super.getError(
                res,
                ErrorCodes.MISSING_PARAM,
                'Missing Moderator Role'
            );
            return;
        }
        super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>
            this.handleSetGuild(res, discord_guild_id, moderator_role)
        );
    }

    async editGuild(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const params = req.query as unknown as GuildParams;
        const guild_id = req.params.guild_id;

        if (!guild_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Guild Id');
            return;
        }
        const guild = await guildController.getGuild(parseInt(guild_id));
        if (!guild) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'Guild not found');
            return;
        }
        super.withPermissionCheck(
            guild.discord_guild_id || '',
            headerKey,
            res,
            () => this.handleEditGuild(res, parseInt(guild_id), params)
        );
    }
    async deleteGuild(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const guild_id = req.params.guild_id;
        if (!guild_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Guild Id');
        }
        const guild = await guildController.getGuild(parseInt(guild_id));
        if (!guild) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'Guild not found');
            return;
        }
        super.withPermissionCheck(
            guild.discord_guild_id || '',
            headerKey,
            res,
            () => this.handleDeleteGuild(res, guild)
        );
    }
    private handleSetGuild(
        res: Response,
        discord_guild_id: string,
        moderator_role: string
    ) {
        guildController
            .setGuild(discord_guild_id, moderator_role)
            .then((data) => res.json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }

    private async handleEditGuild(
        res: Response,
        guild_id: number,
        params: GuildParams
    ) {
        const guild = await guildController.getGuild(guild_id);
        if (!guild) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'Guild not found');
            return;
        }
        guildController
            .editGuild(guild, params)
            .then((data) => res.json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
    private handleDeleteGuild(res: Response, guild: Guild) {
        super
            .delete(guild)
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
}

export const guildApi = new GuildAPI();
