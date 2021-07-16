const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpire} = require('../config/keys');

exports.registerController =async (req,res) =>{
   const { username, email, password} = req.body;

   try{
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            errorMessage:'Email already exists',
        });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // console.log(newUser.password);

    await newUser.save();

    res.json({
        SuccessMessage: 'Registration success. Please Login.',
    });

   } catch (err){
       console.log(err);
       res.status(500).json({
           errorMessage:'Server error',
       })
   }

}
exports.loginController =async (req,res) =>{
    const {email, password} = req.body;
    
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                errorMessage:'Invalid Credential',
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
                return res.status(400).json({
                    errorMessage:'Invalid credentials',
                });
        }

        const playload = {
            user: {
                _id: user._id,
            },
        };

        await jwt.sign(playload, jwtSecret, {expiresIn: jwtExpire}, (err, token)=> {
            if(err) console.log('jwt error:', err);
            const {_id,username,email,role} = user;

            res.json({
                token,
                user: { _id, username, email, role},
            });
        });

    }catch (err){
        console.log('signinController error:', err);
        res.status(500).json({
            errorMessage: 'Server error',
        })
    }

 }