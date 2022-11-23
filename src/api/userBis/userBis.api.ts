import { Request, Response } from 'express';

import { API } from '../API';
import { ErrorCodes } from '../APIErrorHandler';
import { StaticMember } from '../staticMember/staticMember.model';
import { userBisController } from './userBis.controller';
import { UserBis } from './userBis.model';
import { SetUserBisProps } from './userBis.types';

class UserBisAPI extends API {
    constructor() {
        super('UserBis');
    }

    async getUserBisAll(res: Response) {
        userBisController.getUserBisAll().then((data) => res.json(data));
    }
    async getUserBis(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const bis_id = req.params.bis_id;
        if (!bis_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Bis Id');
        }
        const test = UserBis.findOne({
            include: [{model: StaticMember, where: {bis_id}}]
        });
        console.log('HERE', test);

        res.json(test);

        // userBisController
        //     .getUserBis(parseInt(bis_id))
        //     .then(async (data) => {
        //         super.withPermissionCheck(
        //             data?.discord_guild_id || '',
        //             headerKey,
        //             res,
        //             () => res.json(data)
        //         );
        //     })
        //     .catch((err) => {
        //         super.getError(
        //             res,
        //             err.code || ErrorCodes.UNKNOWN,
        //             err.message || err
        //         );
        //     });
    }
    async setUserBis(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const guild_id = req.params.guild_id;
        const user_discord_id = req.params.user_discord_id;
        const bis_name = req.params.bis_name;
        const etro_id = req.params.etro_id;
        // todo params
        if (!user_discord_id || !guild_id || !bis_name || !etro_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Parameter');
            return;
        }

        this.handleSetUserBis(res, {
            guild_id: parseInt(guild_id),
            user_discord_id,
            bis_name,
            bis_link: 'https://etro.gg/gearset/' + etro_id
        });
        // super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>

        // );
    }
    async editUserBis(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
    }
    async deleteUserBis(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
    }
    private handleSetUserBis(res: Response, props: SetUserBisProps) {
        userBisController
            .setUserBis(props)
            .then((data) => res.json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
}

export const userBisApi = new UserBisAPI();
