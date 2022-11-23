import { DataTypes, Model } from 'sequelize';

import { connect } from '../../database/database';
import { Guild } from '../guild/guild.model';

const sequelize = connect();
export class UserBis extends Model {
    declare bis_id: number;
    declare guild_id: number;
    declare user_discord_id: string;
    declare bis_name: string;
    declare bis_link: string;
}

UserBis.init(
    {
        bis_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        guild_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        user_discord_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bis_name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('bis_name', value);
            },
            get() {
                const rawValue = this.getDataValue('bis_name');
                return rawValue || null;
            }
        },
        bis_link: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('bis_link', value);
            },
            get() {
                const rawValue = this.getDataValue('bis_link');
                return rawValue || null;
            }
        },
        weapon: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        head: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        body: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        hands: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        legs: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        feet: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        offHand: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        ears: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        neck: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        wrist: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        finger_l: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        finger_r: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        bis_message_id: {
            type: DataTypes.STRING,
            allowNull: true,
            set(value) {
                this.setDataValue('bis_message_id', value);
            },
            get() {
                const rawValue = this.getDataValue('bis_message_id');
                return rawValue || null;
            }
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'user_bis' // We need to choose the model name
    }
);
