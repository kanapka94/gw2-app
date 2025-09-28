const express = require('express');
const { log } = require('../utils/logger');

const router = express.Router();

// GET /account/achievements - Get user's achievement progress
router.get('/achievements', async (req, res) => {
	const startTime = Date.now();
	log.api('🚀 Starting GW2 API request: GET /account/achievements');

	try {
		log.api('📡 Making request to Guild Wars 2 API...');
		const apiStart = Date.now();

		const response = await fetch('https://api.guildwars2.com/v2/account/achievements', {
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
		log.success(
			`🎉 Successfully fetched ${data.length} achievements in ${Date.now() - startTime}ms`
		);

		res.json(data);
	} catch (err) {
		const totalDuration = Date.now() - startTime;
		log.error(`💥 Error fetching achievements after ${totalDuration}ms:`, err.message);
		res.status(500).json({ error: 'Cannot fetch achievements' });
	}
});

// GET /account/bank - Get user's bank storage
router.get('/bank', async (req, res) => {
	const startTime = Date.now();
	log.api('🚀 Starting GW2 API request: GET /account/bank');

	try {
		log.api('📡 Making request to Guild Wars 2 API...');
		const apiStart = Date.now();

		const response = await fetch('https://api.guildwars2.com/v2/account/bank', {
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
		log.success(`🎉 Successfully fetched bank storage in ${Date.now() - startTime}ms`);

		res.json(data);
	} catch (err) {
		const totalDuration = Date.now() - startTime;
		log.error(`💥 Error fetching bank storage after ${totalDuration}ms:`, err.message);
		res.status(500).json({ error: 'Cannot fetch bank storage' });
	}
});

module.exports = router;

