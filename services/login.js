const { User } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function login(email , password) {
    try{
        // check if user exists
        // by default the postgresql not check for password hence adding it to attribute
        const user =  await User.findOne({ where:{ email} , attributes: ['userID', 'email', 'password']  }); // include password manually
        if( !user ){
            return { success: false , message: "User not found"};
        }
        console.log(user);

        // get original pass from database
        const originalPass = user.password;
        console.log("passwords to check : " , originalPass , password);
        // check for correct password
        const isPassSame = await bcrypt.compare( password , originalPass );
        if( !isPassSame ){
            return null;
        }

        // means credentials are right , now creating JWT
        const userid = user.userID;
        const token = await jwt.sign(
            { userID:  userid, email: user.email } ,
            process.env.SECRET_KEY

        )
        console.log("token : " , token);
        return { userid , token };

    }
    catch( error ){
        console.error("Error during login: " , error);
    }

}

module.exports = { login };