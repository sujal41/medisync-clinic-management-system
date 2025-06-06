const Doctor = require("../models/doctor");

async function createDoctor(
        userID, name , email , 
        mobileNo , qualification 
    ) {
    try {
        const newDoctor = await Doctor.create({
            userID,
            name,
            email,
            mobileNo,
            qualification,
        });

        console.log("Successfully Added Doctor record");
        console.log( newDoctor.doctorId );
        if(newDoctor){
            return true;
        }else{
            return false;
        }
        

    } catch (error) {
        console.error("Error during adding doctor record: ", error);
        return false;
    }
}


async function getOneDoctorData( userId , doctorId ) {
    try {
        console.log("this ids============", userId, doctorId);

        const doctorData = await Doctor.findAll({
        where: {
            doctorId: doctorId
        }
        });


        return doctorData;

    } catch (error) {
        console.error(`Error while fetching doctor:${doctorId}'s record: ` );
    }
}


async function getAllDoctor(userInput) {
    try {
        
        // const userID = typeof userInput === 'object' && userInput.id
        //     ? userInput.id
        //     : userInput;
        const userID= userInput;

        // console.log("this user id ", userID);
        const doctorData = await Doctor.findAll();
        // console.log("this is data for doctor : ", doctorData);
        return doctorData;
    } catch (error) {
        console.error("Error during getting all doctors in server : " , error);
        return false;
    }
}


async function updateDoctorRecord( updateData) {
    try {
        const userId = updateData.userID;
        const doctorId = updateData.doctorId;
        // check if it is the autheticated user who created the doctor
        // only the user who createds doctor can update his details
        const doctorData = await Doctor.findOne({
            where: {
                doctorId: doctorId
            }
        });

        const isUserCreatedDoctor = !!doctorData; // true if found, false if not
        if( !isUserCreatedDoctor ){
            return 401;
        }
        else{
            const [rowsUpdated] = await Doctor.update(updateData, {
                where: { doctorId } // condition to find the specific doctor
            });

            if (rowsUpdated === 0) {
            console.log("❌ No record found or nothing updated.");
            return false;
            }

            console.log("✅ doctor record updated successfully.");
            return true;
        }



    } catch (error) {
        console.error("Error while upating doctor details in server: ", error);
        return false;
    }
}

async function deleteDoctorRecord(userId, doctorId) {
    try {
        // First, find the doctor
        const doctorData = await Doctor.findOne({
            where: {
                doctorId: doctorId
            }
        });

        // If doctor not found or not created by user
        if (!doctorData) {
            return 401;
        }

        // If Doctor exists and belongs to user, delete it
        await Doctor.destroy({
            where: {
                doctorId: doctorId
            }
        });

        return true;

    } catch (error) {
        console.error("Error during deleting doctor's record in service:", error);
        return false;
    }
}


module.exports = { 
    createDoctor , getOneDoctorData ,
    getAllDoctor , updateDoctorRecord , deleteDoctorRecord
};