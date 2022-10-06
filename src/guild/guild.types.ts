import { User } from '../gearset/gearset.types';

export type BaseGuild = {
    guild_id?: number;
    discord_guild_id: string;
    moderator_role?: string;
    static_role?: string;
    sgh_channel_id?: string;
    overview_message_id?: string;
};

export interface Guild extends BaseGuild {
    users?: User[];
}
