const { User } = require("../models");
const loginService = require("../services/login");
async function login(req , res) {
    try {
        const { email , password } = req.body;

        const tokenData = await loginService.login(email , password);
        if ( !tokenData ){
            return res.status(400).json({ 
                success: false, 
                tokenData: null ,
                message: "invalid password"
            });
        }

        return res.status(200).json({ 
            success: true , 
            tokenData: tokenData , 
            message: "login success"
        });

    } catch (error) {
        console.log("error during login: " , error);
    }
}

module.exports = login;