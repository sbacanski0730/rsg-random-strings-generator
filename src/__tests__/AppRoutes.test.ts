import request from 'supertest';
import App from '../App';
import { GENERATE_STRINGS_ENDPOINT_PATH, RETURN_GENERATED_FILE_ENDPOINT_PATH } from '../constants';

const app = new App().app;

const generateStringsPayload = {
	lengths: {
		minimal: 2,
		maximal: 6,
	},
	characters: 'ablw8973',
	combinations: 45,
};

describe('App Routes', () => {
	describe(`POST ${GENERATE_STRINGS_ENDPOINT_PATH}`, () => {
		it('should return key id in headers', async () => {
			const response = await request(app).post(GENERATE_STRINGS_ENDPOINT_PATH).send(generateStringsPayload);

			expect(response.headers).toHaveProperty('request-generation-id');
		});

		it('should send message "Request Accepted"', async () => {
			const response = await request(app).post(GENERATE_STRINGS_ENDPOINT_PATH).send(generateStringsPayload);
			expect(response.text).toBe('Request Accepted');
		});
	});

	describe(`GET ${RETURN_GENERATED_FILE_ENDPOINT_PATH}`, () => {
		it('should return generated strings', async () => {
			const { headers } = await request(app).post(GENERATE_STRINGS_ENDPOINT_PATH).send(generateStringsPayload);

			const response = await request(app).get(
				RETURN_GENERATED_FILE_ENDPOINT_PATH.replace(':id', headers['request-generation-id'])
			);

			console.log('response.text: ', response);
			expect(response.text.length).toEqual(generateStringsPayload.combinations);
		});

		// generated strings should be provided as array
		// separate strings can't contain '/n' char at theirs ends
	});
});
