import { Redis, RedisOptions } from 'ioredis';
import Log from '../utils/Log';

// REFACTOR: this file looks ugly - make it pretty
// but works XD

const DATA_KEYS_EXPIRATION_TIME: number = 1800; // in seconds

const dbURL: string =
	'rediss://default:AbK6AAIncDFjZDE4NDE0MGUwZTE0NTJiYmNlOGRhMWFlYjY0OTZjMnAxNDU3NTQ@crisp-redfish-45754.upstash.io:6379';

const databaseConfig: RedisOptions = {
	lazyConnect: true, // if this option is true, Redis server will be connected only after calling the function
};

class Database {
	private static _database: Database;
	private _redis: Redis;

	private constructor() {
		this.createDatabase();
	}

	public static connect() {
		if (!Database._database) Database._database = new Database();

		return Database._database;
	}

	public set = (key: string, value: string): Promise<'OK'> => this._redis.set(key, value);

	public setEx = (key: string, value: string): Promise<'OK'> =>
		this._redis.set(key, value, 'EX', DATA_KEYS_EXPIRATION_TIME);

	public get = (key: string): Promise<string | null> => this._redis.get(key);

	public info = (): Promise<string> => this._redis.info();

	private createDatabase = async () => {
		// TODO: database url should be from env
		try {
			this._redis = new Redis(dbURL, databaseConfig);
			this._redis.connect(() => Log.info('Database connected'));
		} catch (error) {
			Log.error(error);
		}
	};
}

export default Database;
