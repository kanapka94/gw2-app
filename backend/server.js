const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http').default;
const { log, logger } = require('./utils/logger');

// Import route modules
const characterRoutes = require('./routes/characters');
const professionRoutes = require('./routes/professions');
const favoriteRoutes = require('./routes/favorites');
const accountRoutes = require('./routes/account');

require('dotenv').config({ path: '.env' });

const app = express();

// Use pino-http for request logging
app.use(pinoHttp({ logger }));

app.use(cors());
app.use(express.json());

// Use route modules
app.use('/characters', characterRoutes);
app.use('/professions', professionRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/account', accountRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	log.success(`🚀 Server started successfully!`);
	log.info(`🌐 Backend running on http://localhost:${PORT}`);
	log.info(`📊 Logging enabled with detailed API request tracking`);
	log.info(`🎮 Guild Wars 2 API integration ready`);
});
