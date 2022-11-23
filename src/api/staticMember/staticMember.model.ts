import { DataTypes, Model } from 'sequelize';

import { connect } from '../../database/database';
import { UserBis } from '../userBis/userBis.model';

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
        bis_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            set(value) {
                this.setDataValue('bis_id', value);
            },
            get() {
                const rawValue = this.getDataValue('bis_id');
                return rawValue || null;
            }
        }
    },
    {
        sequelize,
        modelName: 'static_member'
    }
);

StaticMember.hasOne(UserBis, {foreignKey: 'bis_id'});
