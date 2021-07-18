const express=require('express');
var cors = require('cors');
const postRoute = require('./routes/post');

const app=express();
app.use(cors())
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true },
()=>{
    console.log('connected to db');
});

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user',authRoute); 
app.use('/api/posts', postRoute);

app.listen(3000, ()=> console.log('Server running'));