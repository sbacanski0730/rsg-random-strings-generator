import { Request, Response } from 'express';
import StringsGenerator from './components/StringsGenerator';
import Database from './components/Database';
import { nanoid } from 'nanoid';
import Log from './utils/Log';
import ErrorResponses from './utils/ErrorResponses';

class AppControllers {
	public generateStringsFileHandler = (req: Request, res: Response) => {
		const { characters, minLength, maxLength, combinations } = res.locals;

		const generator = new StringsGenerator(minLength, maxLength, characters);

		// REFACTOR: function generateStrings should be a part of the one main function which will generate and return strings. In AppController to generate strings should be used only one function
		generator.generateStrings();

		const randomStrings = generator.getRandomStrings(combinations);

		const database = Database.connect();
		const keyId = nanoid();
		database.set(keyId, randomStrings.toString());

		return res.status(200).setHeader('Request-Generation-Id', keyId).send('Request Accepted');
	};

	public currentlyRunningOperationsHandler = (req: Request, res: Response) => {};

	public returnGeneratedFileHandler = async (req: Request, res: Response) => {
		const id = req.params.id;

		const db = Database.connect();

		const generatedStrings = await db.get(id);

		if (!generatedStrings) return ErrorResponses.ERROR_INVALID_ID_OR_STRINGS_RECEIVED;

		return res.status(200).send(generatedStrings.replaceAll(',', '\n'));
	};
}

export default AppControllers;
