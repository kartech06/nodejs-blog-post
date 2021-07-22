const express=require('express');
var cors = require('cors');
const postRoute = require('./routes/post');
const methodOverride=require('method-override')
const app=express();
app.use(cors())
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Article = require('./model/article')

const authRoute = require('./routes/auth');
const VerifyMytokenNow = require('./routes/VerifyMytokenNow');
//Import Routes
const { date } = require('@hapi/joi');
const { verify } = require('jsonwebtoken');


dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
()=>{
    console.log('connected to db');
});
//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user',authRoute); 
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

//For EJS

app.set('view engine','ejs');
 app.get('/', async (req,res)=>{
    res.render('articles/index');
 })



 app.get('/articles', async (req,res)=>{
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/blog',{articles: articles});
 })

 app.get('/api/verify',verify,VerifyMytokenNow);

 



app.use('/articles', postRoute);


app.listen(3000, ()=> console.log('Server running'));