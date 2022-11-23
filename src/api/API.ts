import CryptoJS from 'crypto-js';
import { Response } from 'express';

import { PRIVATE_KEY } from '../config/config';
import APIErrorHandler, { ErrorCodes } from './APIErrorHandler';
import { Guild } from './guild/guild.model';
import { guildsService } from './guild/guild.service';
import { Static } from './static/static.model.ts';
import { staticService } from './static/static.service';
import { StaticMember } from './staticMember/staticMember.model';
import { staticMembersService } from './staticMember/staticMember.service';
import { userBisService } from './userBis/userBis.service';

export class API {
    declare errorHandler;
    constructor(apiName: string) {
        this.errorHandler = new APIErrorHandler(apiName);
        // this.initialData();
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

    async getGuildByStatic(staticModel: Static): Promise<Guild | null> {
        const guild = await guildsService.getGuild(staticModel?.guild_id);
        return guild;
    }

    async getGuildByStaticId(static_id: number): Promise<Guild | null> {
        const staticModel = await staticService.getStatic(static_id);
        if (!staticModel?.guild_id) {
            return null;
        }
        const guild = await guildsService.getGuild(staticModel?.guild_id);
        return guild || null;
    }

    async getGuildByStaticMemberId(
        static_member_id: number
    ): Promise<Guild | null> {
        const staticMember = await staticMembersService.getStaticMemberById(
            static_member_id
        );
        if (!staticMember) {
            return null;
        }

        const guild = await this.getGuildByStaticId(staticMember.static_id);
        return guild || null;
    }

    async getGuildByGuildId(guild_id: number): Promise<Guild | null> {
        const guild = await guildsService.getGuild(guild_id);
        return guild || null;
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
    private isValid(key: string, headerKey: string) {
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
    }
    private async initialData() {
        // role 1045010249129676941
        // guild 1004408026922487838
        // user 378985901025394688
        try {
            await guildsService.setGuild(
                '1004408026922487838',
                '1045010249129676941'
            );
            await staticService.setStatic(1, 'das etwas', 4);
            await staticMembersService.setStaticMember(1, '378985901025394688');
            await userBisService.setUserBis({
                guild_id: 1,
                user_discord_id: '378985901025394688',
                bis_name: 'test',
                bis_link:
                    'https://etro.gg/gearset/e78a29e3-1dcf-4e53-bbcf-234f33b2c831'
            });
        } catch (error) {
            console.log('ERROR', error);
        }
    }
}
