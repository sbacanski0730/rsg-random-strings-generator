import { Application } from 'express';
import AppControllers from './AppControllers';
import { validateGenerateStringsFile as validateGenerateStringsEndpoint } from './utils/requestsValidation';
import unpackRequestBody from './middleware/unpackRequestBody';

import {
	ENDPOINT_PATH_GENERATE_STRINGS,
	ENDPOINT_PATH_CURRENTLY_RUNNING_OPERATIONS,
	ENDPOINT_PATH_RETURN_GENERATED_FILE,
} from './constants';
import checkRequestPossibility from './middleware/checkRequestPossibility';

class AppRoutes {
	private appControllers = new AppControllers();

	public createAppRoutes = (app: Application): void => {
		app.route(ENDPOINT_PATH_GENERATE_STRINGS) //
			.post(
				//
				[validateGenerateStringsEndpoint, unpackRequestBody, checkRequestPossibility],
				this.appControllers.generateStringsFileHandler
			);

		app.route(ENDPOINT_PATH_CURRENTLY_RUNNING_OPERATIONS) //
			.get(
				//
				this.appControllers.currentlyRunningOperationsHandler
			);

		app.route(ENDPOINT_PATH_RETURN_GENERATED_FILE) //
			.get(
				//
				this.appControllers.returnGeneratedFileHandler
			);
	};
}

export default AppRoutes;
