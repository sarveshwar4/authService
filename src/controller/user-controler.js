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
 
const login = async (req, res) =>{
  try {
    console.log(req.body);
    const token = await userService.generateToken(req.body);
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

module.exports = {
    create,
    login
}