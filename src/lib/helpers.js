const bcrypt = require('bcryptjs');
const { Result } = require('express-validator');
const passport = require('passport');

const helpers = {};
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash =  await bcrypt.hash(password , salt)
    return hash;
};
helpers.matchPassword = async (password, savedPassword) =>{
   try{
    console.log(password)
    console.log(savedPassword)
    const match = await bcrypt.compare(password, savedPassword)
    console.log(match)
    return match;
   }catch(err){
        console.log(err)
   }
   
};
module.exports = helpers;