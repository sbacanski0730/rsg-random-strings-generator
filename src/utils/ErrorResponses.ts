import { Response } from 'express';

class ErrorResponses {
	private _status: number;
	private _message: string;

	constructor(status: number, message: string) {
		this._status = status;
		this._message = message;
	}

	static readonly ERROR_INCOMPATIBLE_DATA = new ErrorResponses(
		400,
		'Request impossible to complete. Provided data are incompatible.'
	);

	static readonly ERROR_WRONG_REQUEST_CONTENT = new ErrorResponses(
		400,
		'Request impossible to complete. Provided data are incompatible.'
	);

	static readonly ERROR_INVALID_ID_OR_STRINGS_RECEIVED = new ErrorResponses(
		400,
		'The generated strings have already been received or the Id number is incorrect'
	);

	public sendAsResponse = (res: Response) => {
		return res.status(this._status).send(this._message);
	};
}

export default ErrorResponses;
