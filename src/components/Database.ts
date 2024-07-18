import { createClient, RedisClientType } from 'redis';
import { DB_URL, DB_GENERATED_STRINGS_EXPIRATION_TIME } from '../../config';
import Log from '../utils/Log';

// TODO: database obj to refactor - this singleton implementation is ugly - make it pretty
// REFACTOR: refactor database class so it will return instance - like [ export default Database.instance(); ]
class Database {
	private static _instance: Database;
	private _redisClient: RedisClientType;

	private constructor() {
		this.createDatabase();
	}

	public static connect = () => {
		Database.instance;
	};

	public static get instance() {
		if (!Database._instance) Database._instance = new Database();

		return Database._instance;
	}

	public set = async (key: string, value: string): Promise<string | null> => {
		return await this._redisClient.set(key, value, { EX: Number(DB_GENERATED_STRINGS_EXPIRATION_TIME) });
	};

	public get = async (key: string): Promise<string | null> => {
		return await this._redisClient.get(key);
	};

	public delete = async (key: string): Promise<number> => {
		return await this._redisClient.del(key);
	};

	private createDatabase = async () => {
		this._redisClient = createClient({ url: DB_URL });
		this._redisClient.on('connect', () => Log.info('Database connected'));
		await this._redisClient.connect();
	};
}

export default Database;

// in case of refactoring database and adding errors validation
// https://redis.io/docs/latest/develop/connect/clients/nodejs/
// https://stackoverflow.com/questions/70805943/redis-redis-createclient-in-typescript
