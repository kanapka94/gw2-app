const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { log, colors } = require('./utils/logger');

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

const db = new sqlite3.Database('./favorites.db');

db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      profession TEXT,
      addedAt TEXT
    )
  `);
});

app.get('/characters', async (req, res) => {
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

app.get('/characters/:name', async (req, res) => {
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

app.get('/professions', async (req, res) => {
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

app.get('/favorites', (req, res) => {
	log.info('📋 Fetching favorites from database...');

	db.all('SELECT * FROM favorites', [], (err, rows) => {
		if (err) {
			log.error('❌ Database error fetching favorites:', err.message);
			return res.status(500).json({ error: err.message });
		}

		log.success(`✅ Retrieved ${rows.length} favorites from database`);
		res.json(rows);
	});
});

app.post('/favorites', (req, res) => {
	const { name, profession } = req.body;
	log.info(`➕ Adding favorite: "${name}" (${profession})`);

	const query = db.prepare('INSERT INTO favorites (name, profession, addedAt) VALUES (?, ?, ?)');

	query.run(name, profession, new Date().toISOString(), function (err) {
		if (err) {
			log.error('❌ Database error adding favorite:', err.message);
			return res.status(500).json({ error: err.message });
		}

		log.success(`✅ Added favorite "${name}" with ID ${this.lastID}`);
		res.json({ id: this.lastID, name, profession });
	});

	query.finalize();
});

app.delete('/favorites/:id', (req, res) => {
	const { id } = req.params;
	log.info(`🗑️  Deleting favorite with ID: ${id}`);

	db.run('DELETE FROM favorites WHERE id = ?', [id], function (err) {
		if (err) {
			log.error('❌ Database error deleting favorite:', err.message);
			return res.status(500).json({ error: err.message });
		}

		if (this.changes === 0) {
			log.warn(`⚠️  No favorite found with ID ${id}`);
		} else {
			log.success(`✅ Deleted favorite with ID ${id}`);
		}

		res.json({ deleted: this.changes });
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	log.success(`🚀 Server started successfully!`);
	log.info(`🌐 Backend running on http://localhost:${PORT}`);
	log.info(`📊 Logging enabled with detailed API request tracking`);
	log.info(`🎮 Guild Wars 2 API integration ready`);
});
