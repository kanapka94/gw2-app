const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { log } = require('../utils/logger');

const router = express.Router();

// Initialize database connection
const db = new sqlite3.Database('./favorites.db');

// Initialize database schema
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

// GET /favorites - Get all favorites
router.get('/', (req, res) => {
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

// POST /favorites - Add a new favorite
router.post('/', (req, res) => {
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

// DELETE /favorites/:id - Delete a favorite by ID
router.delete('/:id', (req, res) => {
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

module.exports = router;
