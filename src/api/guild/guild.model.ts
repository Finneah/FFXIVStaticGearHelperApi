import { DataTypes, Model } from 'sequelize';

import { connect } from '../../database/database';
import { Static } from '../static/static.model.ts';

const sequelize = connect();
export class Guild extends Model {
    declare guild_id: number;
    declare discord_guild_id: string;
    declare moderator_role: string;
    declare best_in_slot_role?: string;
    declare overview_message_id?: string;
}

Guild.init(
    {
        guild_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        discord_guild_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            get() {
                const rawValue = this.getDataValue('discord_guild_id');
                return rawValue || null;
            }
        },
        moderator_role: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('moderator_role', value);
            },
            get() {
                const rawValue = this.getDataValue('moderator_role');
                return rawValue || null;
            }
        },
        best_in_slot_role: {
            type: DataTypes.STRING,
            allowNull: true,
            set(value) {
                this.setDataValue('best_in_slot_role', value);
            },
            get() {
                const rawValue = this.getDataValue('best_in_slot_role');
                return rawValue || null;
            }
        },
        overview_message_id: {
            type: DataTypes.STRING,
            allowNull: true,
            set(value) {
                this.setDataValue('overview_message_id', value);
            },
            get() {
                const rawValue = this.getDataValue('overview_message_id');
                return rawValue || null;
            }
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'guilds' // We need to choose the model name
    }
);
Guild.hasMany(Static, {foreignKey: 'guild_id'});
