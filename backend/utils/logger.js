// Logging utilities with colors and timestamps
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
};

const log = {
	info: (message, data = '') => {
		const timestamp = new Date().toISOString();
		console.log(
			`${colors.blue}[INFO]${colors.reset} ${colors.dim}${timestamp}${colors.reset} ${message}`,
			data
		);
	},
	success: (message, data = '') => {
		const timestamp = new Date().toISOString();
		console.log(
			`${colors.green}[SUCCESS]${colors.reset} ${colors.dim}${timestamp}${colors.reset} ${message}`,
			data
		);
	},
	warn: (message, data = '') => {
		const timestamp = new Date().toISOString();
		console.log(
			`${colors.yellow}[WARN]${colors.reset} ${colors.dim}${timestamp}${colors.reset} ${message}`,
			data
		);
	},
	error: (message, data = '') => {
		const timestamp = new Date().toISOString();
		console.log(
			`${colors.red}[ERROR]${colors.reset} ${colors.dim}${timestamp}${colors.reset} ${message}`,
			data
		);
	},
	api: (message, data = '') => {
		const timestamp = new Date().toISOString();
		console.log(
			`${colors.cyan}[API]${colors.reset} ${colors.dim}${timestamp}${colors.reset} ${message}`,
			data
		);
	},
	request: (message, data = '') => {
		const timestamp = new Date().toISOString();
		console.log(
			`${colors.magenta}[REQUEST]${colors.reset} ${colors.dim}${timestamp}${colors.reset} ${message}`,
			data
		);
	},
};

module.exports = { log, colors };
