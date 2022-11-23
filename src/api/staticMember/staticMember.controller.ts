import Logger from '../../utils/logger';
import { StaticMember } from './staticMember.model';
import { staticMembersService } from './staticMember.service';

const logger = Logger.child({module: 'StaticMemberController'});

class StaticMemberController {
    async getStaticMembers() {
        logger.info('Controller: getStaticMembers');
        return await staticMembersService.getStaticMembers();
    }
    async getStaticMembersByStatic(static_id: number) {
        logger.info('Controller: getStaticMembersByStatic');
        return await staticMembersService.getStaticMembersByStatic(static_id);
    }
    async getStaticMemberById(static_member_id: number) {
        logger.info('Controller: getStaticMemberById');
        return await staticMembersService.getStaticMemberById(static_member_id);
    }
    async setStaticMember(static_id: number, user_discord_id: string) {
        logger.info('Controller: setStaticMember');
        return await staticMembersService.setStaticMember(
            static_id,
            user_discord_id
        );
    }

    async setMainBis(staticMemberModel: StaticMember, main_bis_id: number) {
        logger.info('Controller: setMainBis');

        if (main_bis_id) {
            staticMembersService.setMainBis(staticMemberModel, main_bis_id);
        }

        return await staticMemberModel;
    }
}
export const staticMemberController = new StaticMemberController();
