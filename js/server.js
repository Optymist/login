const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// mock database
const users = []

// register API
app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    // check whether user exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) return res.status(400).json({message: "User already exists"});

    // hash the password
    const hashPass = await bcrypt.hash(password, 10);
    users.push({username, email, password:hashPass});

    res.status(201).json({message: "User registered successfully"});
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    // find the user
    const user = users.find((user) => user.email === email);
    if (!user) return res.status(400).json({message: "Invalid credentials"});

    // check that password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({message: "Invalid password"});

    res.status(200).json({message: 'Login successful'});
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'));