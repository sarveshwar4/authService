const UserRepository = require('../repository/user-repository');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class UserService {
    constructor() {
        this.userRepository = new UserRepository(); // Fixed: instantiated correctly
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.error("Error occurred while creating user:", error); // More specific error logging
            throw new Error('Something went wrong while creating the user'); // Throwing a more descriptive error message
        }
    }
    
    async generateToken(data){
        try {
            console.log(data);
            const user = await this.userRepository.getByEmail(data.emailId);
            const validatePassword = await bcrypt.compare(data.password, user.password);
            if(!validatePassword){
                throw new Error("Invalid Password");
            }
            if(!user){
                throw new Error("Please Enter a valid Email");
            }
            const token = jwt.sign({id : user.id}, "AirlineProject");
            console.log(token); 
            return token;
        } catch (error) {
            throw {error};
        }
    }
}

module.exports = UserService;
