import { DataTypes, Model } from 'sequelize';

import { connect } from '../database/database';
import { Guild } from './Guilds';

const sequelize = connect();
export class Static extends Model {
    declare static_id: number;
    declare guild_id: number;
    declare static_name: string;
    declare overview_message_id: string;
    declare keyword_loot: string;
    declare keyword_buy: string;
    declare members_count: number;
    declare thumbnail: string;
}

Static.init(
    {
        static_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        guild_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        static_name: {
            type: DataTypes.CHAR(30),
            allowNull: false,
            set(value) {
                this.setDataValue('static_name', value);
            },
            get() {
                const rawValue = this.getDataValue('static_name');
                return rawValue || null;
            }
        },
        overview_message_id: {
            type: DataTypes.CHAR(100),
            allowNull: true,
            set(value) {
                this.setDataValue('overview_message_id', value);
            },
            get() {
                const rawValue = this.getDataValue('overview_message_id');
                return rawValue || null;
            }
        },
        keyword_loot: {
            type: DataTypes.CHAR(20),
            allowNull: true,
            set(value) {
                this.setDataValue('keyword_loot', value);
            },
            get() {
                const rawValue = this.getDataValue('keyword_loot');
                return rawValue || null;
            }
        },
        keyword_buy: {
            type: DataTypes.CHAR(20),
            allowNull: true,
            set(value) {
                this.setDataValue('keyword_buy', value);
            },
            get() {
                const rawValue = this.getDataValue('keyword_buy');
                return rawValue || null;
            }
        },
        members_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
            set(value) {
                this.setDataValue('members_count', value);
            },
            get() {
                const rawValue = this.getDataValue('members_count');
                return rawValue || null;
            }
        },
        thumbnail: {
            type: DataTypes.CHAR(256),
            allowNull: true,
            set(value) {
                this.setDataValue('thumbnail', value);
            },
            get() {
                const rawValue = this.getDataValue('thumbnail');
                return rawValue || null;
            }
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Statics', // We need to choose the model name
        freezeTableName: true
    }
);

Static.hasMany(Guild, {foreignKey: 'guild_id'});
