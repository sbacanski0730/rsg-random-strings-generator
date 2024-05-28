import { Request, Response, NextFunction } from 'express';

// TODO: to delete \/
// NOTE: this can be take from validation schema - schema can be transformed into type
type EndpointRequestBody = {
	lengths: {
		minimal: number;
		maximal: number;
	};
	characters: string;
	combinations: number;
};

const unpackRequestBody = (req: Request<{}, {}, EndpointRequestBody>, res: Response, next: NextFunction) => {
	res.locals.minLength = req.body.lengths.minimal;
	res.locals.maxLength = req.body.lengths.maximal;
	res.locals.characters = req.body.characters;
	res.locals.combinations = req.body.combinations;

	return next();
};

export default unpackRequestBody;
