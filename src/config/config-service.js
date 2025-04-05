const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();
const PORT = process.env.PORT;
const JWT_KEY  = process.env.JWT_KEY;
const SALT =  bcrypt.genSaltSync(10);
module.exports = {
    PORT,
    SALT,
    JWT_KEY 
}