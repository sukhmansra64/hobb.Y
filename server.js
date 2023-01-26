const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');

const app = express();

//initialize middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const auth = require('./middleware/auth');

//routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));


connectDB();


app.use(express.static('client/build'));

app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build'))
});

const PORT = process.env.PORT||8080

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});
