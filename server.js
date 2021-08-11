const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser')

const app = express();

const PORT = process.env.PORT||5000

//initialize middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const auth = require('./middleware/auth');

//routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));


app.get('/',(req,res)=>{
    res.send('api running');
});

connectDB();

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});