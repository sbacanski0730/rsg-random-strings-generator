import { Request, Response, NextFunction } from 'express';

import * as v from 'valibot';
import ErrorResponses from './ErrorResponses';

const generateStringRequestSchema = v.object({
	lengths: v.object({
		minimal: v.number('This value needs to be provided as number'),
		maximal: v.number('This value needs to be provided as number', [
			v.maxValue(8, 'Temporary this value can be max 8. Work is underway to lift this restriction.'),
		]),
	}),
	characters: v.string('The characters set must be provided as string', [
		v.minLength(2, 'Minimal value for this property should be 3 or higher.'),
		v.maxLength(8, 'Temporary application accepts max 8 characters '),
	]),
	combinations: v.number([
		v.minValue(1, 'Value for this property has to by more than 0. Otherwise, the request is meaningless.'),
	]),
});
export type GeneratedStringsInput = v.Input<typeof generateStringRequestSchema>;

export const validateGenerateStringsFile = (req: Request, res: Response, next: NextFunction) => {
	try {
		v.parse(generateStringRequestSchema, req.body);
		next();
	} catch (err) {
		return ErrorResponses.ERROR_WRONG_REQUEST_CONTENT.sendAsResponse(res);
	}
};
