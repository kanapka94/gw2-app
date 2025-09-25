const pino = require('pino');

// Create Pino logger with pretty printing for development
const logger = pino({
	level: process.env.LOG_LEVEL || 'info',
	transport:
		process.env.NODE_ENV === 'production'
			? undefined
			: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						translateTime: 'SYS:standard',
						ignore: 'pid,hostname',
					},
			  },
});

// Create a child logger for API requests with additional context
const apiLogger = logger.child({ component: 'api' });

// Create a child logger for requests with additional context
const requestLogger = logger.child({ component: 'request' });

// Enhanced logging methods that maintain the same interface but use structured logging
const log = {
	info: (message, data = null) => {
		if (data) {
			logger.info({ data }, message);
		} else {
			logger.info(message);
		}
	},
	success: (message, data = null) => {
		if (data) {
			logger.info({ success: true, data }, message);
		} else {
			logger.info({ success: true }, message);
		}
	},
	warn: (message, data = null) => {
		if (data) {
			logger.warn({ data }, message);
		} else {
			logger.warn(message);
		}
	},
	error: (message, data = null) => {
		if (data) {
			logger.error({ data }, message);
		} else {
			logger.error(message);
		}
	},
	api: (message, data = null) => {
		if (data) {
			apiLogger.info({ data }, message);
		} else {
			apiLogger.info(message);
		}
	},
	request: (message, data = null) => {
		if (data) {
			requestLogger.info({ data }, message);
		} else {
			requestLogger.info(message);
		}
	},
};

// Export the main logger and the enhanced log object for backward compatibility
module.exports = {
	log,
	logger,
	apiLogger,
	requestLogger,
};
