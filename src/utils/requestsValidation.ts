import { Request, Response, NextFunction } from 'express';

import * as v from 'valibot';
import Log from './Log';

const generateStringRequestSchema = v.object({
	lengths: v.object({
		minimal: v.number('This value needs to be provided as number'),
		maximal: v.number(
			'This value needs to be provided as number',
			// NOTE: This validation is temporary
			// TODO: refactor application to accepting values higher than 8
			[v.maxValue(8, 'Temporary this value can be max 8. Work is underway to lift this restriction.')]
		),
	}),
	characters: v.string('The characters set must be provided as string', [
		v.minLength(2, 'Minimal value for this property should be 3 or higher.'),
		// NOTE: This validation is temporary
		// TODO: refactor application to accepting values higher than 8
		v.maxLength(8, 'Temporary application accepts max 8 characters '),
	]),
	combinations: v.number([
		v.minValue(1, 'Value for this property has to by more than 0. Otherwise, the request is meaningless.'),
	]),
});

export const validateGenerateStringsFile = (req: Request, res: Response, next: NextFunction) => {
	try {
		v.parse(generateStringRequestSchema, req.body);
		next();
	} catch (err) {
		Log.error(err);
		return res.status(400).send('Wrong request content');
	}
};
