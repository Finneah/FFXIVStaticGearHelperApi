import { ErrorCodes } from '../APIErrorHandler';
import { UserBis } from './userBis.model';
import { SetUserBisProps } from './userBis.types';

class UserBisService {
    async syncUserBis() {
        await UserBis.sync();
    }
    async getUserBisAll() {
        try {
            const userBiss = await UserBis.findAll();
            return Promise.resolve(userBiss);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getUserBis(bis_id: number): Promise<UserBis | null> {
        try {
            const userBis = await UserBis.findByPk(bis_id);
            return userBis;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async setUserBis(props: SetUserBisProps): Promise<UserBis | null> {
        try {
            const {guild_id, user_discord_id, bis_name, bis_link} = props;
            const userBis = await UserBis.findOrCreate({
                where: {guild_id, user_discord_id, bis_name},
                defaults: {guild_id, user_discord_id, bis_name, bis_link}
            });
            if (!userBis[1]) {
                throw {
                    code: ErrorCodes.STATIC_EXIST,
                    message: `UserBis "${bis_name}" existiert bereits für ${user_discord_id}.`
                };
            }
            return userBis[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const userBisService = new UserBisService();
