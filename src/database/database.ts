import { Sequelize } from 'sequelize';

import { LOCAL_DB_PW, LOCAL_DB_USER } from '../config/config';

export const connect = () => {
    const sequelize = new Sequelize('ffxivsgh', LOCAL_DB_USER, LOCAL_DB_PW, {
        host: 'localhost',
        port: 5433,
        dialect: 'postgres',
        // database: 'ffxivsgh',
        ssl: false,
        // operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    return sequelize;
};

// export const getClient = () => {
//     const client = new PGClient({
//         connectionString: DATABASE_URL,
//         ssl: false,
//         user: LOCAL_DB_USER,
//         password: LOCAL_DB_PW
//     });

//     client.connect();
//     return client;
// };
