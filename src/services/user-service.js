const UserRepository = require('../repository/user-repository');

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
}

module.exports = UserService;
