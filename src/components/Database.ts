import { Redis, RedisOptions } from 'ioredis';
import Log from '../utils/Log';
import { DB_URL, DB_GENERATED_STRINGS_EXPIRATION_TIME } from '../../config';

const databaseConfig: RedisOptions = {
	lazyConnect: true,
};

class Database {
	private static _instance: Database;
	private _redis: Redis;

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

	public set = (key: string, value: string): Promise<'OK'> =>
		this._redis.set(key, value, 'EX', DB_GENERATED_STRINGS_EXPIRATION_TIME);

	public get = async (key: string): Promise<string | null> => {
		const pipeline = await this._redis
			.pipeline()
			.get(key)
			.del(key)
			.exec((err) => {
				if (err) return null;
			});

		if (!pipeline) return null;

		const [[err, strings]] = pipeline;

		if (err) return null;

		return strings as string;
	};

	private createDatabase = async () => {
		try {
			this._redis = new Redis(DB_URL, databaseConfig);
			this._redis.connect(() => Log.info('Database connected'));
		} catch (error) {
			Log.error(error);
		}
	};
}

export default Database;
