import express, { Application } from 'express';
import AppRoutes from './AppRoutes';
import Log from './utils/Log';

class App {
	private _PORT: Number = 5016;

	private _app: Application = express();
	private _appRoutes: AppRoutes = new AppRoutes();

	constructor() {
		this.config();
		this.createRoutes();
		this.listen();
	}

	private createRoutes = (): void => {
		this._appRoutes.createAppRoutes(this._app);
	};

	private config = (): void => {
		this._app.use(express.json());
	};

	private listen = (): void => {
		this._app.listen(this._PORT, () => Log.info(`Server is listening at port ${this._PORT}`));
	};
}

export default App;
