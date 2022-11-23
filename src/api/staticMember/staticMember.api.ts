import { Request, Response } from 'express';

import { API } from '../API';
import { ErrorCodes } from '../APIErrorHandler';
import { userBisController } from '../userBis/userBis.controller';
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
            .getStaticMembersByStatic_Id(parseInt(static_id))
            .then(async (data) => {
                const guild = await super.getGuildByStaticId(
                    parseInt(static_id)
                );
                super.withPermissionCheck(
                    guild?.discord_guild_id || '',
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

        const guild = await super.getGuildByStaticId(parseInt(static_id));
        if (!guild) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'Guild not found');
            return;
        }

        super.withPermissionCheck(
            guild?.discord_guild_id || '',
            headerKey,
            res,
            () =>
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
        const bis_id = req.params.bis_id;

        if (!bis_id) {
            super.getError(
                res,
                ErrorCodes.MISSING_PARAM,
                'Missing Main Bis Id'
            );
            return;
        }
        const userBis = await userBisController.getUserBis(parseInt(bis_id));

        if (!userBis) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'User Bis Not Found');
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

        const guild = await super.getGuildByStaticId(
            staticMemberModel.static_id
        );

        super.withPermissionCheck(
            guild?.discord_guild_id || '',
            headerKey,
            res,
            () =>
                this.handleEditStaticMember(
                    res,
                    staticMemberModel,
                    userBis.bis_id
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

        const guild = await super.getGuildByStaticId(
            staticMemberModel.static_id
        );
        super.withPermissionCheck(
            guild?.discord_guild_id || '',
            headerKey,
            res,
            () => this.handleDeleteStatic(res, staticMemberModel)
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
        bis_id: number
    ) {
        staticMemberController
            .setMainBis(staticMemberModel, bis_id)
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
