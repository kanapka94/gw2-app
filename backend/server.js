const express = require('express');
const cors = require('cors');
const { log, colors } = require('./utils/logger');

// Import route modules
const characterRoutes = require('./routes/characters');
const professionRoutes = require('./routes/professions');
const favoriteRoutes = require('./routes/favorites');

require('dotenv').config({ path: '.env' });

const app = express();

// Request logging middleware
app.use((req, res, next) => {
	const start = Date.now();
	const { method, url, ip } = req;

	log.request(`${colors.bright}${method}${colors.reset} ${url} from ${ip}`);

	// Log response when finished
	res.on('finish', () => {
		const duration = Date.now() - start;
		const status = res.statusCode;
		const statusColor = status >= 400 ? colors.red : status >= 300 ? colors.yellow : colors.green;

		log.request(`Response: ${statusColor}${status}${colors.reset} - ${duration}ms`);
	});

	next();
});

app.use(cors());
app.use(express.json());

// Use route modules
app.use('/characters', characterRoutes);
app.use('/professions', professionRoutes);
app.use('/favorites', favoriteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	log.success(`🚀 Server started successfully!`);
	log.info(`🌐 Backend running on http://localhost:${PORT}`);
	log.info(`📊 Logging enabled with detailed API request tracking`);
	log.info(`🎮 Guild Wars 2 API integration ready`);
});
