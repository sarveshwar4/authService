const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    return res.status(201).json({
      data: user,
      message: "User is registerd successfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something Wrong in data",
      err: error,
    });
  }
};
 
const singIn = async (req, res) =>{
  try {
    const { emailId, password } = req.body;
    const token = await userService.singIn(emailId, password);
    res.cookie("token", token);
    return res.status(201).json({
      data: token,
      message: "User is login successfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something Wrong in data",
      err: error,
    });
  }
}

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"]; 
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: response,
      message: "User is authenticated successfully",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Something Wrong in data",
      err: error,
    });
  }
}

module.exports = {
    create,
    singIn,
    isAuthenticated
}