import Logger from '../../utils/logger';
import { userBisService } from './userBis.service';
import { SetUserBisProps } from './userBis.types';

const logger = Logger.child({module: 'UserBisController'});

class UserBisController {
    async getUserBisAll() {
        logger.info('Controller: getUserBisAll');
        return await userBisService.getUserBisAll();
    }
    async getUserBis(bis_id: number) {
        logger.info('Controller: getUserBis');
        return await userBisService.getUserBis(bis_id);
    }
    async setUserBis(props: SetUserBisProps) {
        logger.info('Controller: setUserBis');
        return await userBisService.setUserBis(props);
    }
}
export const userBisController = new UserBisController();
