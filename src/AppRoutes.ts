import { Application } from 'express';
import AppControllers from './AppControllers';

const GENERATE_STRING_ENDPOINT_PATH = '/api/generate-strings-file/';
const CURRENTLY_RUNNING_OPERATIONS_ENDPOINT_PATH = '/api/currently-running-operations/';
const RETURN_GENERATED_FILE_ENDPOINT_PATH = '/api/return-generated-files/:id';

class AppRoutes {
	private appControllers = new AppControllers();

	public createAppRoutes = (app: Application): void => {
		app.route(GENERATE_STRING_ENDPOINT_PATH) //
			.post(this.appControllers.generateStringsFileHandler);

		app.route(CURRENTLY_RUNNING_OPERATIONS_ENDPOINT_PATH) //
			.get(this.appControllers.currentlyRunningOperationsHandler);

		app.route(RETURN_GENERATED_FILE_ENDPOINT_PATH) //
			.get(this.appControllers.returnGeneratedFileHandler);
	};
}

export default AppRoutes;
