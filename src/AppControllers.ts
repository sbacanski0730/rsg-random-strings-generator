import { Request, Response } from 'express';
import StringsGenerator from './components/StringsGenerator';
import Database from './components/Database';
import { nanoid } from 'nanoid';
import ErrorResponses from './utils/ErrorResponses';

class AppControllers {
	public generateStringsFileHandler = (_: Request, res: Response) => {
		const { characters, minLength, maxLength, combinations } = res.locals;

		const randomStrings = new StringsGenerator(minLength, maxLength, characters).generateStrings(combinations);

		const database = Database.instance;
		const keyId = nanoid();
		database.set(keyId, randomStrings.toString());

		return res.status(200).setHeader('Request-Generation-Id', keyId).send('Request Accepted');
	};

	public currentlyRunningOperationsHandler = (req: Request, res: Response) => {};

	public returnGeneratedFileHandler = async (req: Request, res: Response) => {
		const db = Database.instance;

		const generatedStrings = await db.get(req.params.id);

		if (!generatedStrings) return ErrorResponses.ERROR_INVALID_ID_OR_STRINGS_RECEIVED;

		await db.delete(req.params.id);

		return res.status(200).send(generatedStrings.split(','));
	};
}

export default AppControllers;
