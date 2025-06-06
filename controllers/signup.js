const signUpService = require("../services/signup");

async function signup( req , res) {
    try {
        const { userName , email , password , confirmPassword } = req.body;

        console.log( email , password);
        if( !userName ) {
            return res.status(400).json({ message: "userName is required"});
        }

        if( !email || !password ) {
            return res.status(400).json({ message: "Email and passwords required"});
        }

        // checking for valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        if( !isValidEmail ){
            return res.status(400).json({
                value: false ,
                message: "Invalid Email"
            });
        }

        // checking for valis password

        if( password !== confirmPassword ){
            return res.status(400).json({ message: "Passwords are not same"});
        }

        if( !password || !confirmPassword){
            return res.status(400).json({ message: "both password and confirmPasswords required"});
        }

        if( password !== confirmPassword){
            return res.status(400).json({ message: "Passwords do not match"});
        }

        // testing difficult of pasword
        // At least 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 special char
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; 
        const isStrongPassword = strongRegex.test(password);  // return true if password is strong

        if( !isStrongPassword ){
            res.status(400).json({ 
                valid: false,
                message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character." })
        }

        // till here we can assum that password is valid

        // encrypt the password and email in database
        // .....................

        // create user record in database
        const userID = await signUpService.signup( userName , email , password);
        return res.status(200).json({ 
            userID: userID,
            message: "Signed-Up Successfully , Kindly Proceed to login" 
        });
        
        // otp generate option in future
        // .......................


    } catch (error) {
        console.log("error : " , error)
    }
}

function validPassword( password , confirmPassword , req , res){

    // if valid
    return true;
}

module.exports = { signup }