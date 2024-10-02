import { Request, Response, NextFunction } from 'express';
import { GeneratedStringsInput } from '../utils/requestsValidation';

const unpackRequestBody = (req: Request<{}, {}, GeneratedStringsInput>, res: Response, next: NextFunction) => {
	res.locals.minLength = req.body.lengths.minimal;
	res.locals.maxLength = req.body.lengths.maximal;
	res.locals.characters = req.body.characters;
	res.locals.combinations = req.body.combinations;

	return next();
};

export default unpackRequestBody;
