const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

require('dotenv').config({ path: '.env' });

const app = express();
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
	try {
		const response = await fetch('https://api.guildwars2.com/v2/characters', {
			headers: {
				Authorization: `Bearer ${process.env.GW2_API_TOKEN}`,
			},
		});

		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Cannot fetch characters' });
	}
});

app.get('/characters/:name', async (req, res) => {
	const { name } = req.params;

	try {
		const response = await fetch(`https://api.guildwars2.com/v2/characters/${name}`, {
			headers: {
				Authorization: `Bearer ${process.env.GW2_API_TOKEN}`,
			},
		});

		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Cannot fetch character by name: ' + name });
	}
});

app.get('/professions', async (req, res) => {
	try {
		const response = await fetch('https://api.guildwars2.com/v2/professions', {
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
		console.error(err);
		res.status(500).json({ error: 'Nie udało się pobrać danych' });
	}
});

app.get('/favorites', (req, res) => {
	db.all('SELECT * FROM favorites', [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		res.json(rows);
	});
});

app.post('/favorites', (req, res) => {
	const { name, profession } = req.body;
	const query = db.prepare('INSERT INTO favorites (name, profession, addedAt) VALUES (?, ?, ?)');

	query.run(name, profession, new Date().toISOString(), function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		res.json({ id: this.lastID, name, profession });
	});

	query.finalize();
});

app.delete('/favorites/:id', (req, res) => {
	const { id } = req.params;

	db.run('DELETE FROM favorites WHERE id = ?', [id], function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		res.json({ deleted: this.changes });
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Backend działa na http://localhost:${PORT}`);
});
