import { Request, Response } from 'express';

import StringsGenerator from './components/StringsGenerator';
import Database from './components/Database';
import { nanoid } from 'nanoid';

class AppControllers {
	public generateStringsFileHandler = (req: Request, res: Response) => {
		const { characters, minLength, maxLength, combinations } = res.locals;

		const generator = new StringsGenerator(minLength, maxLength, characters);

		// REFACTOR: function generateStrings should be a part of the one main function which will generate and return strings. In AppController to generate strings should be used only one function
		generator.generateStrings();

		const randomStrings = generator.getRandomStrings(combinations);

		const database = Database.connect();
		const keyId = nanoid();
		database.setEx(keyId, randomStrings.toString());

		return res.status(200).setHeader('Request-Generation-Id', keyId).send('Request Accepted');
	};

	public currentlyRunningOperationsHandler = (req: Request, res: Response) => {};

	public returnGeneratedFileHandler = (req: Request, res: Response) => {};
}

export default AppControllers;
