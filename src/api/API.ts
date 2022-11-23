import CryptoJS from 'crypto-js';
import { Response } from 'express';

import { PRIVATE_KEY } from '../config/config';
import APIErrorHandler, { ErrorCodes } from './APIErrorHandler';
import { Guild } from './guild/guild.model';
import { guildsService } from './guild/guild.service';
import { staticController } from './static/static.controller';
import { Static } from './static/static.model.ts';
import { staticService } from './static/static.service';
import { staticMemberController } from './staticMember/staticMember.controller';
import { StaticMember } from './staticMember/staticMember.model';
import { staticMembersService } from './staticMember/staticMember.service';

export class API {
    declare errorHandler;
    constructor(apiName: string) {
        this.errorHandler = new APIErrorHandler(apiName);
    }

    getIsValid(key: string, headerKey: string) {
        return this.isValid(key, headerKey);
    }
    withPermissionCheck(
        key: string,
        headerKey: string,
        res: Response,
        cb: () => void
    ) {
        if (!this.isValid(key, headerKey)) {
            return this.getError(
                res,
                ErrorCodes.PERMISSION_DENIED,
                'Du hast nicht die nötigen Berechtigungen um diese Daten zu lesen.'
            );
        } else {
            return cb();
        }
    }
    getError(
        res: Response,
        errorCode: ErrorCodes,
        errorMessage: string,
        errorStatus?: number
    ) {
        return this.handleError(res, errorCode, errorMessage, errorStatus);
    }

    async getDiscordGuildIdByStatic(
        staticModel: Static
    ): Promise<string | null> {
        const guild = await guildsService.getGuild(staticModel?.guild_id);
        return guild?.discord_guild_id || null;
    }

    async getDiscordGuildIdByStaticId(
        static_id: number
    ): Promise<string | null> {
        const staticModel = await staticService.getStatic(static_id);
        if (!staticModel?.guild_id) {
            return null;
        }
        const guild = await guildsService.getGuild(staticModel?.guild_id);
        return guild?.discord_guild_id || null;
    }

    async getDiscordGuildIdByStaticMemberId(
        static_member_id: number
    ): Promise<string | null> {
        const staticMember = await staticMembersService.getStaticMemberById(
            static_member_id
        );
        if (!staticMember) {
            return null;
        }

        const discord_guild_id = await this.getDiscordGuildIdByStaticId(
            staticMember.static_id
        );
        return discord_guild_id;
    }

    async getDiscordGuildIdByGuildId(guild_id: number): Promise<string | null> {
        const guild = await guildsService.getGuild(guild_id);
        return guild?.discord_guild_id || null;
    }

    async delete(model: StaticMember | Static | Guild) {
        model.destroy();
        model.save();
    }
    private async handleError(
        res: Response,
        errorCode: ErrorCodes,
        errorMessage: string,
        errorStatus?: number
    ) {
        this.errorHandler.setError(errorCode, errorMessage, errorStatus);
        this.errorHandler.handleError(res);
    }
    private isValid = (key: string, headerKey: string) => {
        try {
            const decryptedKey = CryptoJS.HmacSHA256(
                key,
                key + PRIVATE_KEY
            ).toString();

            return decryptedKey === headerKey;
        } catch (error) {
            console.log('ERROR', error);
            return false;
        }
    };
}
