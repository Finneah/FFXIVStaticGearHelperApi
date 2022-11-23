import dotenv from 'dotenv';

dotenv.config();

export const TOKEN = process.env.TOKEN || '';
export const APP_ID = process.env.APP_ID || '';
export const LOCAL_GUILD_ID = process.env.LOCAL_GUILD_ID || '';
export const LOCAL_DB_USER = process.env.LOCAL_DB_USER || '';
export const LOCAL_DB_PW = process.env.LOCAL_DB_PW || '';
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
export const KEY = process.env.KEY || '';
export const ETRO_API = 'https://etro.gg/api' || '';
