const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = require('./db');

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'))
// })

// register API
app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?);"
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user ' + username + ":", err);
                res.status(500).send({message: 'Database error.'});
            } else {
                res.status(201).send({message: 'User registered successfully.'})
            }
        });
    } catch (err) {
        console.error('Hashing error:', err);
        res.status(500).send({message: "Error hashing password."})
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.log('Error querying database: ', err);
                res.status(500).send({message: "Database error."});
            } else if (results.length === 0) {
                res.status(401).send({message: 'Invalid email or password'});
            } else {
                const user = results[0];
                const username = user.username;

                const passwordIsMatch = await bcrypt.compare(password, user.password_hash);

                if (passwordIsMatch) {
                    res.status(200).send({message: 'Login successful', username});
                } else {
                    res.status(401).send({message: 'Invalid email or password.'});
                }
            }
        });
    } catch (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).send({message: 'Error logging in.'});
    }

    
});

app.delete('/deregister', (req, res) => {
    const {email} = req.body;

    const query = 'DELETE FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send({message: 'Error deregistering account.'});
        } else if (result.affectedRows === 0) {
            res.status(400).send({message: 'User not found.'});
        } else {
            res.status(200).send({message: 'Account deregistered successfully.'});
        }
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));