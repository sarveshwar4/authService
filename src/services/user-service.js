const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/config-service");
class UserService {
  constructor() {
    this.userRepository = new UserRepository(); // Fixed: instantiated correctly
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.error("Error occurred while creating user:", error);
      throw new Error("Something went wrong while creating the user");
    }
  }

  async singIn(email, plainPasswword) {
    try {
      // step-1 -->fetch the user using the email
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        throw new Error("Please Enter a valid Email");
      }
      //   step-2--> compare incoming stored password with the hashed password
      const validatePassword = await this.validatePassword(
        plainPasswword,
        user.password
      );
    
      if (!validatePassword) {
        throw new Error("Invalid Password");
      }
      //   step-3-->> if password is correct then generate the token
      const token = this.createToken({ emailId: user.emailId, id: user.id });
      console.log("this is the token", token);
      return token;
    } catch (error) {
      throw { error };
    }
  };

  
  validatePassword = async(planePassword, userHashedPassword) => {
    try {
      return await bcrypt.compareSync(planePassword, userHashedPassword);
    } catch (error) {
      throw error;
    }
  };

    createToken(user){
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      console.log("this is the token", token);
      return token;
    } catch (error) {
      throw error;
    }
  };
  async isAuthenticated(token){
    try {
      if(!token){
        throw new Error("Token is not provided");
      }
      const decode = this.verifyToken(token);
      if(!decode){
        throw new Error("Invalid Token");
      }
      const user = await this.userRepository.getById(decode.id);
      if(!user){
        throw new Error("User not found");
      }
      return user.id;
    } catch (error) {
      console.error("Error occurred while authenticating user:", error);
      throw error;
    }
  }

  verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, JWT_KEY);
      return decoded;
    } catch (error) {
      console.error("something went wrong while verifying the token", error);
      throw error;
    }
  };
}

module.exports = UserService;
