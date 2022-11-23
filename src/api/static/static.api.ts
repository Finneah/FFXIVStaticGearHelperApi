import { Request, Response } from 'express';

import { API } from '../API';
import { ErrorCodes } from '../APIErrorHandler';
import { staticController } from './static.controller';
import { Static } from './static.model.ts';
import { StaticParams } from './static.types';

class StaticAPI extends API {
    constructor() {
        super('StaticAPI');
    }

    async getStatics(res: Response) {
        staticController
            .getStatics()
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
    async getStatic(req: Request, res: Response) {
        const static_id = req.params.static_id;
        const headerKey = req.headers.key as unknown as string;
        if (!static_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Static Id');
        }

        staticController
            .getStatic(parseInt(static_id))
            .then(async (data) => {
                if (!data?.guild_id) {
                    res.json(data);
                    return;
                }

                const discord_guild_id =
                    await super.getDiscordGuildIdByStaticId(data.static_id);
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
    async setStatic(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const params = req.query as unknown as StaticParams;
        const guild_id = req.params.guild_id;
        const static_name = req.params.static_name;
        if (!guild_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Guild Id');
        }

        if (!static_name) {
            super.getError(
                res,
                ErrorCodes.MISSING_PARAM,
                'Missing Static Name'
            );
        }
        const discord_guild_id = await super.getDiscordGuildIdByGuildId(
            parseInt(guild_id)
        );
        super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>
            this.handleSetStatic(res, parseInt(guild_id), static_name, params)
        );
    }
    async editStatic(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const static_id = req.params.static_id;
        const params = req.query as unknown as StaticParams;

        if (!static_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Static Id');
        }
        const staticModel = await staticController.getStatic(
            parseInt(static_id)
        );
        if (!staticModel) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'Static not found');
            return;
        }

        const discord_guild_id = await super.getDiscordGuildIdByStatic(
            staticModel
        );
        super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>
            this.handleEditStatic(res, staticModel, params)
        );
    }

    async deleteStatic(req: Request, res: Response) {
        const headerKey = req.headers.key as unknown as string;
        const static_id = req.params.static_id;
        if (!static_id) {
            super.getError(res, ErrorCodes.MISSING_PARAM, 'Missing Static Id');
        }
        const staticModel = await staticController.getStatic(
            parseInt(static_id)
        );
        if (!staticModel) {
            super.getError(res, ErrorCodes.NOT_FOUND, 'Static not found');
            return;
        }

        const discord_guild_id = await super.getDiscordGuildIdByStatic(
            staticModel
        );
        super.withPermissionCheck(discord_guild_id || '', headerKey, res, () =>
            this.handleDeleteStatic(res, staticModel)
        );
    }
    private handleSetStatic(
        res: Response,
        guild_id: number,
        static_name: string,
        params: StaticParams
    ) {
        staticController
            .setStatic(guild_id, static_name, params)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
    private handleEditStatic(
        res: Response,
        staticModel: Static,
        params: StaticParams
    ) {
        staticController
            .editStatic(staticModel, params)
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                super.getError(
                    res,
                    err.code || ErrorCodes.UNKNOWN,
                    err.message || err
                );
            });
    }
    private handleDeleteStatic(res: Response, staticModel: Static) {
        super
            .delete(staticModel)
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
export const staticApi = new StaticAPI();
