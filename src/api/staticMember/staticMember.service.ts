import { StaticMember } from './staticMember.model';

class StaticMembersService {
    async syncStaticMembers() {
        await StaticMember.sync();
    }
    async getStaticMembers(): Promise<StaticMember[] | null> {
        try {
            const staticMembers = await StaticMember.findAll();
            return Promise.resolve(staticMembers);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getStaticMembersByStatic(
        static_id: number
    ): Promise<StaticMember[] | null> {
        try {
            return await StaticMember.findAll({
                where: {static_id}
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getStaticMemberById(
        static_member_id: number
    ): Promise<StaticMember | null> {
        try {
            return await StaticMember.findByPk(static_member_id);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setStaticMember(
        static_id: number,
        user_discord_id: string
    ): Promise<StaticMember | null> {
        try {
            const staticMember = await StaticMember.findOrCreate({
                where: {
                    static_id,
                    user_discord_id
                },
                defaults: {static_id, user_discord_id}
            });
            return staticMember[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setMainBis(
        staticMember: StaticMember,
        bis_id: number
    ): Promise<StaticMember | null> {
        try {
            await staticMember.setDataValue('main_bis_id', bis_id);
            return await staticMember.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setStaticId(
        staticMember: StaticMember,
        static_id: number
    ): Promise<StaticMember | null> {
        try {
            await staticMember.setDataValue('static_id', static_id);
            return await staticMember.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const staticMembersService = new StaticMembersService();
