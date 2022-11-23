import { DataTypes, Model } from 'sequelize';

import { connect } from '../../database/database';

const sequelize = connect();
export class StaticMember extends Model {
    declare static_member_id: number;
    declare static_id: number;
    declare user_discord_id: string;
    declare main_bis_id: number;
}

StaticMember.init(
    {
        static_member_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        static_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            set(value) {
                this.setDataValue('static_id', value);
            },
            get() {
                const rawValue = this.getDataValue('static_id');
                return rawValue || null;
            }
        },
        user_discord_id: {type: DataTypes.STRING, allowNull: false},
        main_bis_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            set(value) {
                this.setDataValue('main_bis_id', value);
            },
            get() {
                const rawValue = this.getDataValue('main_bis_id');
                return rawValue || null;
            }
        }
    },
    {
        sequelize,
        modelName: 'StaticMember',
        freezeTableName: true
    }
);
