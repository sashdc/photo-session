const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Initialize SQLite database
// Initialize SQLite database
const db = new sqlite3.Database('photoshoots.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS photoshoots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE,
            company TEXT,
            revenue REAL,
            type_of_shoot TEXT,
            hours REAL  -- Valid table and column names
        )`);
    }
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/add-photoshoot', (req, res) => {
    const { date, company, revenue, type_of_shoot } = req.body;

    // Insert the data into the SQLite database
    const insertQuery = `INSERT INTO photoshoots (date, company, revenue, type_of_shoot)
        VALUES (?, ?, ?, ?)`;

    db.run(insertQuery, [date, company, revenue, type_of_shoot], function (err) {
        if (err) {
            console.error('Error adding photoshoot:', err.message);
            res.status(500).json({ message: 'Failed to add photoshoot.' });
        } else {
            res.json({ message: 'Photoshoot added successfully.' });
        }
    });
});

app.get('/get-photoshoots', (req, res) => {
    // Fetch photoshoot data from the SQLite database
    const selectQuery = 'SELECT * FROM photoshoots';

    db.all(selectQuery, (err, rows) => {
        if (err) {
            console.error('Error fetching photoshoots:', err.message);
            res.status(500).json({ message: 'Failed to retrieve photoshoots.' });
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
