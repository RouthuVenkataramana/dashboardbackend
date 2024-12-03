const mysql = require('mysql');



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'realdata'
});

connection.connect((err) => {
    if (!err) {
        console.log('DB connection succeeded');
    } else {
        console.log('DB connection failed');
        console.log(err);
    }
});

module.exports = connection;
