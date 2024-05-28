import { Request, Response } from 'express';
import Log from './utils/Log';
import StringsGenerator from './components/StringsGenerator';

class AppControllers {
	public generateStringsFileHandler = (req: Request, res: Response) => {
		const { characters, minLength, maxLength, combinations } = res.locals;

		const generator = new StringsGenerator(minLength, maxLength, characters);
		generator.generateStrings();

		const randomStrings = generator.getRandomStrings(combinations);
		console.log('randomStrings: ', randomStrings);
		return res.status(200).send('Hello world');
	};

	public currentlyRunningOperationsHandler = (req: Request, res: Response) => {};

	public returnGeneratedFileHandler = (req: Request, res: Response) => {};
}

export default AppControllers;
