const express = require('express');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const cors =  require('cors');
const bodyparser= require('body-parser');
app.use(bodyparser.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true 
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use('/auth',require('./routes/auth'));
app.use('/managers',require('./routes/managers'));
app.use('/user',require('./routes/user'));




server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
