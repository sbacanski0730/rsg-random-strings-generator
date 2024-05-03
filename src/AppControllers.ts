import { Request, Response } from 'express';
import Log from './utils/Log';

class AppControllers {
	public generateStringsFileHandler = (req: Request, res: Response) => {
		Log.info(req);
		return res.status(200).send('Hello world');
	};

	public currentlyRunningOperationsHandler = (req: Request, res: Response) => {};

	public returnGeneratedFileHandler = (req: Request, res: Response) => {};
}

export default AppControllers;
