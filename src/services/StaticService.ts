import { Static } from '../models/Static';
import { staticRelation } from '../relations/static/StaticRelations';

class StaticService {
    async getStatics() {
        return await staticRelation.getStatics();
    }
    async getStatic(static_id: number) {
        return await staticRelation.getStatic(static_id);
    }
    async setStatic(
        guild_id: number,
        static_name: string,
        members_count: number,
        keyword_loot?: string,
        keyword_buy?: string,
        thumbnail?: string
    ) {
        return await staticRelation.setStatic(
            guild_id,
            static_name,
            members_count,
            keyword_loot,
            keyword_buy,
            thumbnail
        );
    }
    async setStaticName(staticModel: Static, static_name: string) {
        return await staticRelation.setStaticName(staticModel, static_name);
    }
    async getStaticName(staticModel: Static) {
        return await staticRelation.getStaticName(staticModel);
    }
    async setOverviewMessageId(
        staticModel: Static,
        overview_message_id: string
    ) {
        return await staticRelation.setOverviewMessageId(
            staticModel,
            overview_message_id
        );
    }
    async getOverviewMessageId(staticModel: Static) {
        return await staticRelation.getOverviewMessageId(staticModel);
    }
    async setKeywordLoot(staticModel: Static, keyword_loot: string) {
        return await staticRelation.setKeywordLoot(staticModel, keyword_loot);
    }
    async getKeywordLoot(staticModel: Static) {
        return await staticRelation.getKeywordLoot(staticModel);
    }
    async setKeywordBuy(staticModel: Static, keyword_buy: string) {
        return await staticRelation.setKeywordBuy(staticModel, keyword_buy);
    }
    async getKeywordBuy(staticModel: Static) {
        return await staticRelation.getKeywordBuy(staticModel);
    }
    async setMembersCount(staticModel: Static, members_count: string) {
        return await staticRelation.setMembersCount(staticModel, members_count);
    }
    async getMembersCount(staticModel: Static) {
        return await staticRelation.getMembersCount(staticModel);
    }
}
export const staticService = new StaticService();
