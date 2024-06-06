import dotenv from 'dotenv';

dotenv.config();

export const DB_URL: string = process.env.DB_URL!;

export const DB_GENERATED_STRINGS_EXPIRATION_TIME: string = process.env.DB_GENERATED_STRINGS_EXPIRATION_TIME!;
