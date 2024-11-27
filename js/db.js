const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'login',
    database: 'login_user_management',
});

connection.connect((err) => {
    if (err) {
        console.error("Couldn't connect to MySQL:", err)
        return;
    } else {
        console.log('Connected to database.')
    }
});

module.exports = connection;