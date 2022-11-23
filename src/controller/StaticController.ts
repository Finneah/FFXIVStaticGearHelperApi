import { stringify } from 'querystring';

import { Static } from '../models/Static';
import { staticService } from '../services/StaticService';
import Logger from '../utils/logger';

const logger = Logger.child({module: 'StaticController'});

class StaticController {
    async getStatics() {
        logger.info('Controller: getStatics');
        return await staticService.getStatics();
    }
    async getStatic(static_id: number) {
        logger.info('Controller: getStatic');
        return await staticService.getStatic(static_id);
    }
    async setStatic(
        guild_id: number,
        static_name: string,
        params: {
            overview_message_id?: string;
            keyword_loot?: string;
            keyword_buy?: string;
            members_count?: number;
            thumbnail?: string;
        }
    ) {
        logger.info('Controller: setStatic');
        return await staticService.setStatic(
            guild_id,
            static_name,
            params.members_count || 8,
            params.keyword_loot,
            params.keyword_buy,
            params.thumbnail
        );
    }
    async editStatic(
        static_id: number,
        params: {
            static_name?: string;
            overview_message_id?: string;
            keyword_loot?: string;
            keyword_buy?: string;
            members_count?: string;
        }
    ) {
        logger.info('Controller: editStatic');
        const staticModel = await this.getStatic(static_id);
        if (staticModel && params.static_name) {
            staticService.setStaticName(staticModel, params.static_name);
        }
        if (staticModel && params.overview_message_id) {
            staticService.setOverviewMessageId(
                staticModel,
                params.overview_message_id
            );
        }
        if (staticModel && params.keyword_loot) {
            staticService.setKeywordLoot(staticModel, params.keyword_loot);
        }
        if (staticModel && params.keyword_buy) {
            staticService.setKeywordLoot(staticModel, params.keyword_buy);
        }
        if (staticModel && params.members_count) {
            staticService.setKeywordLoot(staticModel, params.members_count);
        }
        return await staticModel;
    }
}
export const staticController = new StaticController();
