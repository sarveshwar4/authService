const { where } = require("sequelize");
const {User} = require("../models/index");

class UserRepository{
    async create(data) {
        try {
            const user = await User.create(data);
            return user; // Return created user
        } catch (error) {
            console.error("Error while creating user:", error.message || error);
            throw new Error('Something went wrong while creating the user.');
        }
    }
    async destroy(userid){
        try {
            await User.destroy({
                where:{
                    id:userid
                }
            });
        } catch (error) {
            console.log("SomeThing Went Wrong overhere");
            throw {error};
        }
    }

    async getByEmail(emailId){
        try{
        const response = await User.findOne(
            {where:
               {emailId : emailId}
            },
        );
        console.log("this is upcoming response from repository",response);
        return response;
        }catch(error){
            console.log("SomeThing Went Wrong overhere");
            throw {error};
        }
    }
}

module.exports = UserRepository;