import pino from 'pino';

const Log = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			translateTime: 'dd-MM-yyyy H:mm',
		},
	},
});

export default Log;
