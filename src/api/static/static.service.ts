import { ErrorCodes } from '../APIErrorHandler';
import { StaticMember } from '../staticMember/staticMember.model';
import { Static } from './static.model.ts';

class StaticService {
    async syncStatics() {
        await Static.sync();
    }
    async getStatics(): Promise<Static[] | null> {
        try {
            const statics = await Static.findAll();
            return Promise.resolve(statics);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getStatic(static_id: number): Promise<Static | null> {
        try {
            const staticModel = await Static.findByPk(static_id);

            return staticModel;
        } catch (error) {
            return null;
        }
    }
    async getStaticByGuildByName(
        guild_id: number,
        static_name: string
    ): Promise<Static | null> {
        try {
            return await Static.findOne({where: {guild_id, static_name}});
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getStaticForMember(static_member_id: number): Promise<Static | null> {
        try {
            const staticMember = await StaticMember.findOne({
                where: {static_member_id}
            });
            if (!staticMember) {
                return null;
            }
            return await Static.findOne({
                where: {static_id: staticMember?.static_id}
            });
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
    ): Promise<Static | null> {
        try {
            const exist = await this.getStaticByGuildByName(
                guild_id,
                static_name
            );
            if (exist) {
                throw {
                    code: ErrorCodes.STATIC_EXIST,
                    message: `Static "${static_name}" existiert auf diesem Server bereits`
                };
            }
            return await Static.create({
                guild_id,
                static_name,
                members_count,
                keyword_loot: keyword_loot || null,
                keyword_buy: keyword_buy || null,
                thumbnail: thumbnail || null
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async setStaticName(
        staticModel: Static,
        static_name: string
    ): Promise<Static | null> {
        try {
            await staticModel.setDataValue('static_name', static_name);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getStaticName(staticModel: Static): Promise<Static | null> {
        try {
            return await staticModel.getDataValue('static_name');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setOverviewMessageId(
        staticModel: Static,
        overview_message_id: string
    ): Promise<Static | null> {
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
    async getOverviewMessageId(staticModel: Static): Promise<Static | null> {
        try {
            return await staticModel.getDataValue('overview_message_id');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setKeywordLoot(
        staticModel: Static,
        keyword_loot: string
    ): Promise<Static | null> {
        try {
            await staticModel.setDataValue('keyword_loot', keyword_loot);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getKeywordLoot(staticModel: Static): Promise<Static | null> {
        try {
            return await staticModel.getDataValue('keyword_loot');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setKeywordBuy(
        staticModel: Static,
        keyword_buy: string
    ): Promise<Static | null> {
        try {
            await staticModel.setDataValue('keyword_buy', keyword_buy);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getKeywordBuy(staticModel: Static): Promise<Static | null> {
        try {
            return await staticModel.getDataValue('keyword_buy');
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setMembersCount(
        staticModel: Static,
        members_count: number
    ): Promise<Static | null> {
        try {
            await staticModel.setDataValue('members_count', members_count);
            return await staticModel.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getMembersCount(staticModel: Static): Promise<Static | null> {
        try {
            return await staticModel.getDataValue('members_count');
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
export const staticService = new StaticService();
