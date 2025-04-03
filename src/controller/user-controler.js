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

module.exports = {
    create
}