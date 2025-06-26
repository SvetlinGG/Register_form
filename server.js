const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// SMTP Configuration - UPDATE THESE WITH YOUR REAL CREDENTIALS
const SMTP_CONFIG = {
    provider: 'gmail', // or 'yahoo'
    sender_email: '', // Your Gmail or Yahoo email
    sender_app_password: 'GET_YOUR_16_CHAR_APP_PASSWORD_FROM_GOOGLE' // Go to Google Account → Security → App passwords
};

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//  SQLite DB
const db = new sqlite3.Database('users.db', (err) => {
    if (err) throw err;
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`);
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    // Save user to DB
    db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).json({ error: 'Email already registered.' });
            }
            return res.status(500).json({ error: 'Database error.' });
        }
        // Call Python script to send email with new parameters
        execFile('python3', [
            'send_email.py', 
            SMTP_CONFIG.provider,
            SMTP_CONFIG.sender_email,
            SMTP_CONFIG.sender_app_password,
            email, 
            username
        ], (error, stdout, stderr) => {
            if (error) {
                console.error('Email error:', error);
                return res.status(500).json({ error: 'Failed to send verification email.' });
            }
            console.log('Email output:', stdout);
            return res.json({ message: 'Registration successful! Verification email sent.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 