import { Request, Response } from 'express';

import { API } from '../API';
import { ErrorCodes } from '../APIErrorHandler';
import { staticMemberController } from './staticMember.controller';
import { StaticMember } from './staticMember.model';

class StaticMemberAPI extends API {
    constructor() {
        super('StaticMember');
    }

    async getStaticMembers(res: Response) {
        staticMemberController
            .getStaticMembers()
            .then((data) => res.json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
    async getStaticMembersByStatic(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const static_id = req.params.static_id;
        if (!static_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Static Id');
        }
        staticMemberController
            .getStaticMembersByStatic(parseInt(static_id))
            .then(async (data) => {
                const discord_guild_id =
                    await super.getDiscordGuildIdByStaticId(
                        parseInt(static_id)
                    );
                super.withPermissionCheck(
                    discord_guild_id || '',
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
    async setStaticMember(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const static_id = req.params.static_id;
        const user_discord_id = req.params.user_discord_id;

        const discord_guild_id = await super.getDiscordGuildIdByStaticId(
            parseInt(static_id)
        );
        super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>
            this.handleSetStaticMember(
                res,
                parseInt(static_id),
                user_discord_id
            )
        );
    }
    async editStaticMember(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const static_member_id = req.params.static_member_id;
        const main_bis_id = req.params.main_bis_id;

        if (!main_bis_id) {
            super.getError(
                res,
                ErrorCodes.MISSING_PARAM,
                'Missing Main Bis Id'
            );
            return;
        }
        const staticMemberModel =
            await staticMemberController.getStaticMemberById(
                parseInt(static_member_id)
            );

        if (!staticMemberModel) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'Static not found');
            return;
        }

        const discord_guild_id = await super.getDiscordGuildIdByStaticId(
            staticMemberModel.static_id
        );

        super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>
            this.handleEditStaticMember(
                res,
                staticMemberModel,
                parseInt(main_bis_id)
            )
        );
    }

    async deleteStaticMember(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const static_member_id = req.params.static_member_id;
        if (!static_member_id) {
            super.getError(
                res,
                ErrorCodes.MISSING_PARAM,
                'Missing Static Member Id'
            );
        }
        const staticMemberModel =
            await staticMemberController.getStaticMemberById(
                parseInt(static_member_id)
            );
        if (!staticMemberModel) {
            super.getError(
                res,
                ErrorCodes.NOT_FOUND,
                'Static Member not found'
            );
            return;
        }

        const discord_guild_id = await super.getDiscordGuildIdByStaticId(
            staticMemberModel.static_id
        );
        super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>
            this.handleDeleteStatic(res, staticMemberModel)
        );
    }
    private handleSetStaticMember(
        res: Response,
        static_id: number,
        user_discord_id: string
    ) {
        staticMemberController
            .setStaticMember(static_id, user_discord_id)
            .then((data) => res.json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
    private handleEditStaticMember(
        res: Response,
        staticMemberModel: StaticMember,
        main_bis_id: number
    ) {
        staticMemberController
            .setMainBis(staticMemberModel, main_bis_id)
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
    private handleDeleteStatic(res: Response, staticMemberModel: StaticMember) {
        super
            .delete(staticMemberModel)
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

export const staticMemberApi = new StaticMemberAPI();
