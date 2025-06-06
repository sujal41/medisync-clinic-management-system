const { User } = require("../models");
const bcrypt = require('bcrypt');

async function signup( userName , email , password) {
    try {
        console.log("user password to save: ", email , password);

        // hashing the password
        const hashedPassword = await bcrypt.hash( password , 10);
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        console.log(newUser.userID);
        return newUser.userID;

    } catch (error) {
        console.log("Error during signup: ", error);
    }

}

module.exports = { signup };