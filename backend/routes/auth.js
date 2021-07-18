const router=require('express').Router();
const User=require('../model/User');    
const jwt=require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt=require('bcryptjs');


//Validations

router.post('/register',async (req, res) => {

    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already in db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword  
    });
    try{
        const savedUser = await user.save();
        res.send({user : user._id});
    }
    catch (err){
        res.status(400).send(err);
    }
});


//Login
router.post('/login', async (req,res) =>{
    //Lets validate 
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        //Check if user is already in db
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email dont exist Please Sign up!');
        
        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');

        //Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);

        // res.send('Logged In');

})



module.exports = router;
