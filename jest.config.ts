// jest.config.ts
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
	// [...]
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.test.(ts|js)'],
	verbose: true,
	forceExit: true,
	// clearMocks: true,

	transform: {
		// '^.+\\.[tj]sx?$' to process ts,js,tsx,jsx with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process ts,js,tsx,jsx,mts,mjs,mtsx,mjsx with `ts-jest`
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				// ts-jest configuration goes here
			},
		],
	},
};

export default jestConfig;
