import dotenv from 'dotenv';

dotenv.config();

let PORT: string = process.env.NODE_ENV == 'test' ? '0' : process.env.PORT!;

let DB_URL: string = process.env.NODE_ENV == 'test' ? process.env.DB_URL! : process.env.DB_URL!;

let DB_GENERATED_STRINGS_EXPIRATION_TIME: string =
	process.env.NODE_ENV == 'test' ? '180' : process.env.DB_GENERATED_STRINGS_EXPIRATION_TIME!;

export { PORT, DB_URL, DB_GENERATED_STRINGS_EXPIRATION_TIME };
