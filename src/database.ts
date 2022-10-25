import { Client as PGClient, QueryConfig } from 'pg';

import { DATABASE_URL, LOCAL_DB_PW, LOCAL_DB_USER } from './config';

export const getClient = () => {
    const client = new PGClient({
        connectionString: DATABASE_URL,
        ssl: false,
        user: LOCAL_DB_USER,
        password: LOCAL_DB_PW
    });
    client.connect();
    return client;
};

export const runQuery = async (query: QueryConfig) => {
    try {
        const client = getClient();
        const res = await client.query(query);
        client.end();

        return res;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const buildInsertQuery = (
    tableName: string,
    queryName: string,
    values: {[s: string]: string | undefined} | ArrayLike<string | undefined>
) => {
    const basicText = `INSERT INTO ${tableName} (`;
    const basicTextValues = `)VALUES(`;

    const valuesForString: string[] = [];
    const keysForString: string[] = [];
    const indexes: string[] = [];

    for (let i = 0; i < Object.values(values).length; i++) {
        const value: string | undefined = Object.values(values)[i];
        const key = Object.keys(values)[i];

        if (value) {
            valuesForString.push(value);
            keysForString.push(key);
            indexes.push(`$${valuesForString.length}`);
        }
    }

    const query: QueryConfig = {
        name: queryName,
        text:
            basicText +
            keysForString.join(',') +
            basicTextValues +
            indexes.join(',') +
            `) RETURNING *;`,
        values: valuesForString
    };
    return query;
};

export const buildSelectQuery = (
    tableName: string,
    queryName: string,
    values?: {[s: string]: string | undefined} | ArrayLike<string | undefined>,
    keys?: string[]
) => {
    let basicText = `SELECT `;

    let where = ``;
    const valuesForString: string[] = [];

    if (values) {
        where = `WHERE `;
        for (let i = 0; i < Object.values(values).length; i++) {
            const value: string | undefined = Object.values(values)[i];
            const key = Object.keys(values)[i];

            if (value) {
                valuesForString.push(value);

                where += `${key}=$${valuesForString.length}`;
            }
        }
    }

    if (!keys) {
        basicText += `* FROM ${tableName} `;
    } else {
        basicText += `(${keys.join(',')}) FROM ${tableName} `;
    }

    const query: QueryConfig = {
        name: queryName,
        text: basicText + where + ';',
        values: valuesForString
    };
    return query;
};

export const buildUpdateQuery = (
    tableName: string,
    queryName: string,
    whereValues:
        | {[s: string]: string | undefined}
        | ArrayLike<string | undefined>,
    values: {[s: string]: string | undefined} | ArrayLike<string | undefined>
) => {
    const basicText = `UPDATE ${tableName} SET `;
    const valuesForString: string[] = [];
    const valueString: string[] = [];
    const keysForString: string[] = [];
    const indexes: string[] = [];
    let where = `WHERE `;

    if (values) {
        for (let i = 0; i < Object.values(values).length; i++) {
            const value: string | undefined = Object.values(values)[i];
            const key = Object.keys(values)[i];

            if (value) {
                indexes.push(`${i + 1}`);
                keysForString.push(key);
                valuesForString.push(value);
                valueString.push(`${key}=$${indexes.length}`);
            }
        }
    }
    for (let i = 0; i < Object.values(whereValues).length; i++) {
        const value: string | undefined = Object.values(whereValues)[i];
        const key = Object.keys(whereValues)[i];

        if (value) {
            indexes.push(`${i + 1}`);
            valuesForString.push(value);
            where += `${key}=$${indexes.length}`;
        }
    }

    const query: QueryConfig = {
        name: queryName,
        text: basicText + valueString + ' ' + where + ' RETURNING *;',
        values: valuesForString
    };
    return query;
};
