import { config } from 'dotenv';
config();
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_URL, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
