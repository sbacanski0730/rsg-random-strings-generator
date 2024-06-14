import express, { Application } from 'express';
import AppRoutes from './AppRoutes';
import Log from './utils/Log';
import Database from './components/Database';
import { PORT } from '../config';

class App {
	private _PORT: number = Number(PORT) || 5016;

	private _app: Application = express();
	private _appRoutes: AppRoutes = new AppRoutes();

	constructor() {
		this.config();
		this.connectDatabase();
		this.createRoutes();
		this.listen();
	}

	private config = (): void => {
		this._app.use(express.json());
	};

	private createRoutes = (): void => {
		this._appRoutes.createAppRoutes(this._app);
	};

	private connectDatabase = (): void => {
		Database.connect();
	};

	private listen = (): void => {
		this._app.listen(this._PORT, () => Log.info(`Server is listening at port ${this._PORT}`));
	};
}

export default App;
