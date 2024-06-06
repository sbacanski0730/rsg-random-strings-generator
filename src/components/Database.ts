import { Redis, RedisOptions } from 'ioredis';
import Log from '../utils/Log';
import { DB_URL, DB_GENERATED_STRINGS_EXPIRATION_TIME } from '../../config';

// REFACTOR: this file looks ugly - make it pretty
// but works XD

const databaseConfig: RedisOptions = {
	lazyConnect: true, // if this option is true, Redis server will be connected only after calling the function
};

class Database {
	private static _database: Database;
	private _redis: Redis;

	// DOUBT: is it a good idea to try recreate constructor to work like now separate static function connect()
	private constructor() {
		this.createDatabase();
	}

	public static connect() {
		if (!Database._database) Database._database = new Database();

		return Database._database;
	}

	public set = (key: string, value: string): Promise<'OK'> =>
		this._redis.set(key, value, 'EX', DB_GENERATED_STRINGS_EXPIRATION_TIME);

	public get = async (key: string): Promise<string | null> => {
		// TODO: add here option deleting founded value by given key
		const pipeline = await this._redis.pipeline().get(key).exec();

		if (!pipeline) return null;

		const [[err, strings]] = pipeline;

		if (err) return null;

		return strings as string;
	};

	public info = (): Promise<string> => this._redis.info();

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
