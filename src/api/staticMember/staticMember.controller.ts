import Logger from '../../utils/logger';
import { StaticMember } from './staticMember.model';
import { staticMembersService } from './staticMember.service';

const logger = Logger.child({module: 'StaticMemberController'});

class StaticMemberController {
    /**
     * @desc get all staticMembers for all guilds
     * @returns all staticMembers
     */
    async getStaticMembers() {
        logger.info('Controller: getStaticMembers');
        return await staticMembersService.getStaticMembers();
    }
    /**
     * @desc get staticMembers by static_id
     * @param static_id
     * @returns staticMembers
     */
    async getStaticMembersByStatic_Id(static_id: number) {
        logger.info('Controller: getStaticMembersByStatic');
        return await staticMembersService.getStaticMembersByStatic(static_id);
    }
    /**
     * @desc get staticMember by static_member_id
     * @param static_member_id
     * @returns staticMember
     */
    async getStaticMemberById(static_member_id: number) {
        logger.info('Controller: getStaticMemberById');
        return await staticMembersService.getStaticMemberById(static_member_id);
    }

    /**
     * @desc create user if not exist and add to staticMembers
     * @param guild_id
     * @param static_id
     * @param user_discord_id
     * @returns staticMember
     */
    async setStaticMember(static_id: number, user_discord_id: string) {
        logger.info('Controller: setStaticMember');

        return await staticMembersService.setStaticMember(
            static_id,
            user_discord_id
        );
    }

    /**
     * @desc set MainBis for staticMember
     * @param staticMemberModel
     * @param main_bis_id
     * @returns staticMember
     */
    async setMainBis(staticMemberModel: StaticMember, bis_id: number) {
        logger.info('Controller: setMainBis');

        if (bis_id) {
            staticMembersService.setMainBis(staticMemberModel, bis_id);
        }

        return await staticMemberModel;
    }
}
export const staticMemberController = new StaticMemberController();
