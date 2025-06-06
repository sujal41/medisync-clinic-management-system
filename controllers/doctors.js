const doctorService = require("../services/doctor");

async function createDoctor( req , res) {
    try {
        const { userID, name , email , mobileNo , qualification 
        } = req.body;

        // check validations for userID , doctorName , disease 
        if( !userID || !name || !email || !mobileNo || !qualification ){
            return res.status(400).json({ value: false,  message: "kindly fill all necessary detials (userID, name , email , mobileNo , qualification )" });
        }
        // we will check the validations for mobileno here

        const mobileRegex = /^[6-9]\d{9}$/;
        if( !mobileNo ){
            return res.status(400).json({ value: false , message: "Mobile No is required" })
        }
        if( !mobileRegex.test(mobileNo) ){
            return res.status(400).json({ value: false , message: "Mobile number must be 10 digits and start with 6, 7, 8, or 9." })
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


        // lets add the doctor record now
        const addDoctor = doctorService.createDoctor(
            userID, name , email , mobileNo , qualification 
        );

        if( !addDoctor ){
            return res.status(400).json({ value: false , message: "Error during adding doctor record" });
        }
        else{
            return res.status(200).json({ value: true , message: "Successfully Added doctor Record" });
        }
        
        
    } catch (error) {
        console.error("Error during creating doctor : " , error);
    }
}


async function getOneDoctorData( req , res){
    try {
        const doctorId = req.params.id;
        // const userId = req.body.userID;

        if( !doctorId ){
            return res.status(400).json({ message: "please provide doctor id in url (eg. 1 or 2) and userID in req.body"});
        }

        const doctorData = await doctorService.getOneDoctorData( doctorId);
        if( !doctorData ){
            // return res.status(400).json({ success: false , message: "invalid userId or doctorId" });
        }
        else{
            return res.status(200).json({ 
                success: true, 
                message: `successfully fetched record of doctor: ${doctorId}`,
                data: doctorData
            });
        }

    } catch (error) {
        console.error("Error during getting data for one doctor in controller : " , error);
        return res.status(500).json({ success: false , message: "internal server error : error while processing your request" })
    }
}


async function getAllDoctors( req , res) {
    try {
        const { userID }  = req.body;
        if( !userID){
            return res.status(400).json({ success: false , messsage: "user id is required"})
        }

        console.log("user id in controller : ", userID);
        const responseData = await doctorService.getAllDoctor(userID);
        if( !responseData ){
            console.log("empty data");
        }
        else if( responseData ){
            return res.status(200).json({ 
                success: true , 
                message: `Successfully fetched the data of all Doctor for user: ${userID}`,
                data: responseData
            });
        }
        
    } catch (error) {
        console.error("Error during getting all Doctors in controller  : " , error);
    }
}


async function updateDoctorRecord(req , res) {
    try {
        const { userID ,name , email , mobileNo , qualification } = req.body;
        const doctorId = req.params.id;

        if( !userID || !doctorId ){
            return res.status(400).json({ message: "please provide doctor id in url (eg. 1 or 2) and userID in req.body"});
        }

        updateData = {}
        if (userID) updateData.userID = userID;
        if (doctorId) updateData.doctorId = doctorId;
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (mobileNo) updateData.mobileNo = mobileNo;
        if (qualification) updateData.qualification = qualification;

        const isUpdated = await doctorService.updateDoctorRecord( updateData );

        if( isUpdated === 401 ){
            res.status(401).json("you are not allowed to change this doctor's data");
        }
        if( !isUpdated ){
            res.status(401).json("no such record found for update");
        }

        else{
            res.status(200).json({ success: true , message: "successfully updated the doctor data"});
        }

    } catch (error) {
        console.error("Error during updating doctor's record in controller");
        res.status(500).json({ success: false , message: "Internal server error: error while updating doctor's data"});
    }
}

async function deleteDoctorRecord( req , res) {
    try {
        
        const { userID } = req.body;
        const doctorId = req.params.id;

        if( !userID || !doctorId ){
            return res.status(400).json({ message: "please provide doctor id in url (eg. 1 or 2) and userID in req.body"});
        }

        // if( !doctorName , !mobileNo , !disease){
        //     return res.status(400).json({ message: "please provide doctorName , mobileNo , disease in req.body"});
        // }

        

        const isUpdated = await doctorService.deleteDoctorRecord( userID , doctorId );

        if( isUpdated === 401 ){
            res.status(401).json("you are not allowed to change this doctor's data");
        }
        if( !isUpdated ){
            res.status(401).json("no such record found for delete");
        }

        else{
            res.status(200).json({ success: true , message: "successfully deleted the doctor data"});
        }


    } catch (error) {
        console.error("Error during deleting doctor's record in controller");
        res.status(500).json({ success: false , message: "Internal server error: error while deleting doctor's data"});
    }
}

module.exports = { 
    createDoctor , getOneDoctorData , getAllDoctors , 
    updateDoctorRecord , deleteDoctorRecord
};