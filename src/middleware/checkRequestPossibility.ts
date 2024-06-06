import { Request, Response, NextFunction } from 'express';
import ErrorResponses from '../utils/ErrorResponses';

const checkRequestPossibility = (req: Request, res: Response, next: NextFunction) => {
	const { characters, combinations, minLength, maxLength } = res.locals;

	// REFACTOR: refactor this function to optimize

	const MAXIMUM_POSSIBLE_PERMUTATIONS = possiblePermutationsForAllLengths(characters, minLength, maxLength);

	if (minLength > maxLength) return ErrorResponses.ERROR_INCOMPATIBLE_DATA.sendAsResponse(res);

	if (maxLength > characters.length) return ErrorResponses.ERROR_INCOMPATIBLE_DATA.sendAsResponse(res);

	if (combinations > MAXIMUM_POSSIBLE_PERMUTATIONS) return ErrorResponses.ERROR_INCOMPATIBLE_DATA.sendAsResponse(res);

	if (minLength < 1) return ErrorResponses.ERROR_INCOMPATIBLE_DATA.sendAsResponse(res);

	return next();
};

export default checkRequestPossibility;

const possiblePermutationsForAllLengths = (chars: string, minLength: number, maxLength: number): number => {
	let range = [];

	if (minLength === maxLength) range.push(minLength);

	if (minLength !== maxLength) range = Array.from({ length: maxLength - minLength / 2 }, (_, i) => minLength + i);

	return range
		.map((length) => countPermutationsWithoutRepetitions(chars.length, length))
		.reduce((acc, curr) => (acc = acc + curr));
};

const countPermutationsWithoutRepetitions = (numberOfAllChars: number, permutationsLength: number): number => {
	return fac(numberOfAllChars) / fac(numberOfAllChars - permutationsLength);
};

const fac = (num: number): number => {
	if (num === 0) return 1;
	return num * fac(num - 1);
};
