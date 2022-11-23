import { Static } from '../../models/Static';

class StaticRelation {
    constructor() {
        this.syncStatics();
    }

    private async syncStatics() {
        await Static.sync();
    }
    async getStatics() {
        try {
            return await Static.findAll();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getStatic(static_id: number) {
        try {
            return await Static.findByPk(static_id);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setStatic(
        guild_id: number,
        static_name: string,
        members_count: number,
        keyword_loot?: string,
        keyword_buy?: string,
        thumbnail?: string
    ) {
        try {
            return await Static.create({
                guild_id,
                static_name,
                members_count,
                keyword_loot: keyword_loot || null,
                keyword_buy: keyword_buy || null,
                thumbnail: thumbnail || null
            });
        } catch (error) {
            console.log(error);

            return Promise.reject(error);
        }
    }
    async setStaticName(staticModel: Static, static_name: string) {
        try {
            await staticModel.setDataValue('static_name', static_name);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getStaticName(staticModel: Static) {
        try {
            return await staticModel.getDataValue('static_name');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setOverviewMessageId(
        staticModel: Static,
        overview_message_id: string
    ) {
        try {
            await staticModel.setDataValue(
                'overview_message_id',
                overview_message_id
            );
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getOverviewMessageId(staticModel: Static) {
        try {
            return await staticModel.getDataValue('overview_message_id');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setKeywordLoot(staticModel: Static, keyword_loot: string) {
        try {
            await staticModel.setDataValue('keyword_loot', keyword_loot);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getKeywordLoot(staticModel: Static) {
        try {
            return await staticModel.getDataValue('keyword_loot');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setKeywordBuy(staticModel: Static, keyword_buy: string) {
        try {
            await staticModel.setDataValue('keyword_buy', keyword_buy);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getKeywordBuy(staticModel: Static) {
        try {
            return await staticModel.getDataValue('keyword_buy');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setMembersCount(staticModel: Static, members_count: string) {
        try {
            await staticModel.setDataValue('members_count', members_count);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getMembersCount(staticModel: Static) {
        try {
            return await staticModel.getDataValue('members_count');
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
export const staticRelation = new StaticRelation();
