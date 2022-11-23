import Logger from '../../utils/logger';
import { Static } from './static.model.ts';
import { staticService } from './static.service';
import { StaticParams } from './static.types';

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
    async getStaticForMember(static_member_id: number) {
        logger.info('Controller: getStaticForMember');
        return await staticService.getStaticForMember(static_member_id);
    }
    async setStatic(
        guild_id: number,
        static_name: string,
        params: StaticParams
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
    async editStatic(staticModel: Static, params: StaticParams) {
        logger.info('Controller: editStatic');

        if (params.static_name) {
            staticService.setStaticName(staticModel, params.static_name);
        }
        if (params.overview_message_id) {
            staticService.setOverviewMessageId(
                staticModel,
                params.overview_message_id
            );
        }
        if (params.keyword_loot) {
            staticService.setKeywordLoot(staticModel, params.keyword_loot);
        }
        if (params.keyword_buy) {
            staticService.setKeywordBuy(staticModel, params.keyword_buy);
        }
        if (params.members_count) {
            staticService.setMembersCount(staticModel, params.members_count);
        }
        return await staticModel;
    }
}
export const staticController = new StaticController();
