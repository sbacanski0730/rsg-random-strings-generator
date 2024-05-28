import { Application } from 'express';
import AppControllers from './AppControllers';
import { validateGenerateStringsFile as validateGenerateStringsEndpoint } from './utils/requestsValidation';
import unpackRequestBody from './middleware/unpackRequestBody';

// DOUBT: I don't know is it a good idea to keep path strings in separate file
import {
	GENERATE_STRINGS_ENDPOINT_PATH,
	CURRENTLY_RUNNING_OPERATIONS_ENDPOINT_PATH,
	RETURN_GENERATED_FILE_ENDPOINT_PATH,
} from './constants';
import checkRequestPossibility from './middleware/checkRequestPossibility';

// DOUBT: ->|
// const GENERATE_STRING_ENDPOINT_PATH = '/api/generate-strings-file/';
// const CURRENTLY_RUNNING_OPERATIONS_ENDPOINT_PATH = '/api/currently-running-operations/';
// const RETURN_GENERATED_FILE_ENDPOINT_PATH = '/api/return-generated-files/:id';

class AppRoutes {
	private appControllers = new AppControllers();

	public createAppRoutes = (app: Application): void => {
		app.route(GENERATE_STRINGS_ENDPOINT_PATH) //
			.post(
				//
				[validateGenerateStringsEndpoint, unpackRequestBody, checkRequestPossibility],
				this.appControllers.generateStringsFileHandler
			);

		app.route(CURRENTLY_RUNNING_OPERATIONS_ENDPOINT_PATH) //
			.get(this.appControllers.currentlyRunningOperationsHandler);

		app.route(RETURN_GENERATED_FILE_ENDPOINT_PATH) //
			.get(this.appControllers.returnGeneratedFileHandler);
	};
}

export default AppRoutes;
