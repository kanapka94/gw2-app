const express = require('express');
const { log } = require('../utils/logger');

const router = express.Router();

// GET /characters - Get all characters
router.get('/', async (req, res) => {
	const startTime = Date.now();
	log.api('🚀 Starting GW2 API request: GET /characters');

	try {
		log.api('📡 Making request to Guild Wars 2 API...');
		const apiStart = Date.now();

		const response = await fetch('https://api.guildwars2.com/v2/characters', {
			headers: {
				Authorization: `Bearer ${process.env.GW2_API_TOKEN}`,
			},
		});

		const apiDuration = Date.now() - apiStart;
		log.api(`⏱️  GW2 API response received in ${apiDuration}ms`);
		log.api(`📊 Response status: ${response.status} ${response.statusText}`);

		if (!response.ok) {
			log.error(`❌ GW2 API error: ${response.status} ${response.statusText}`);
			return res.status(response.status).json({
				error: `GW2 API error: ${response.status} ${response.statusText}`,
			});
		}

		log.api('🔄 Parsing JSON response...');
		const parseStart = Date.now();
		const data = await response.json();
		const parseDuration = Date.now() - parseStart;

		log.api(`✅ JSON parsed in ${parseDuration}ms`);
		log.success(`🎉 Successfully fetched ${data.length} characters in ${Date.now() - startTime}ms`);

		res.json(data);
	} catch (err) {
		const totalDuration = Date.now() - startTime;
		log.error(`💥 Error fetching characters after ${totalDuration}ms:`, err.message);
		res.status(500).json({ error: 'Cannot fetch characters' });
	}
});

// GET /characters/:name - Get specific character by name
router.get('/:name', async (req, res) => {
	const { name } = req.params;
	const startTime = Date.now();

	log.api(`🚀 Starting GW2 API request: GET /characters/${name}`);
	log.api(`👤 Character name: "${name}"`);

	try {
		log.api('📡 Making request to Guild Wars 2 API...');
		const apiStart = Date.now();

		const response = await fetch(`https://api.guildwars2.com/v2/characters/${name}`, {
			headers: {
				Authorization: `Bearer ${process.env.GW2_API_TOKEN}`,
			},
		});

		const apiDuration = Date.now() - apiStart;
		log.api(`⏱️  GW2 API response received in ${apiDuration}ms`);
		log.api(`📊 Response status: ${response.status} ${response.statusText}`);

		if (!response.ok) {
			log.error(
				`❌ GW2 API error for character "${name}": ${response.status} ${response.statusText}`
			);
			return res.status(response.status).json({
				error: `Character "${name}" not found: ${response.status} ${response.statusText}`,
			});
		}

		log.api('🔄 Parsing JSON response...');
		const parseStart = Date.now();
		const data = await response.json();
		const parseDuration = Date.now() - parseStart;

		log.api(`✅ JSON parsed in ${parseDuration}ms`);
		log.success(
			`🎉 Successfully fetched character "${name}" (Level ${data.level} ${data.profession}) in ${
				Date.now() - startTime
			}ms`
		);

		res.json(data);
	} catch (err) {
		const totalDuration = Date.now() - startTime;
		log.error(`💥 Error fetching character "${name}" after ${totalDuration}ms:`, err.message);
		res.status(500).json({ error: 'Cannot fetch character by name: ' + name });
	}
});

module.exports = router;
