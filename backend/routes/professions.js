const express = require('express');
const { log } = require('../utils/logger');

const router = express.Router();

// GET /professions - Get all professions
router.get('/', async (req, res) => {
	const startTime = Date.now();
	log.api('🚀 Starting GW2 API request: GET /professions');

	try {
		log.api('📡 Making request to Guild Wars 2 API...');
		const apiStart = Date.now();

		const response = await fetch('https://api.guildwars2.com/v2/professions', {
			headers: {
				Authorization: `Bearer ${process.env.GW2_API_TOKEN}`,
			},
		});

		const apiDuration = Date.now() - apiStart;
		log.api(`⏱️  GW2 API response received in ${apiDuration}ms`);
		log.api(`📊 Response status: ${response.status} ${response.statusText}`);

		if (!response.ok) {
			log.error(`❌ GW2 API error: ${response.status} ${response.statusText}`);
			return res.status(response.status).json({ error: 'API request failed' });
		}

		log.api('🔄 Parsing JSON response...');
		const parseStart = Date.now();
		const data = await response.json();
		const parseDuration = Date.now() - parseStart;

		log.api(`✅ JSON parsed in ${parseDuration}ms`);
		log.success(`🎉 Successfully fetched professions in ${Date.now() - startTime}ms`);

		res.json(data);
	} catch (err) {
		const totalDuration = Date.now() - startTime;
		log.error(`💥 Error fetching professions after ${totalDuration}ms:`, err.message);
		res.status(500).json({ error: 'Nie udało się pobrać danych' });
	}
});

// GET /professions/:name - Get specific profession by name
router.get('/:name', async (req, res) => {
	const { name } = req.params;
	const startTime = Date.now();
	log.api(`🚀 Starting GW2 API request: GET /professions/${name}`);
	log.api(`👤 Profession name: "${name}"`);

	try {
		log.api('📡 Making request to Guild Wars 2 API...');

		const response = await fetch(`https://api.guildwars2.com/v2/professions/${name}`, {
			headers: {
				Authorization: `Bearer ${process.env.GW2_API_TOKEN}`,
			},
		});

		if (!response.ok) {
			return res.status(response.status).json({ error: 'API request failed' });
		}

		const data = await response.json();

		res.json(data);
	} catch (err) {
		const totalDuration = Date.now() - startTime;
		log.error(`💥 Error fetching profession "${name}" after ${totalDuration}ms:`, err.message);
		res.status(500).json({ error: 'Cannot fetch profession by name: ' + name });
	}
});

module.exports = router;
