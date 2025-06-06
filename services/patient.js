const Patient = require("../models/patient");
/**
 * @param {String} userID 
 * @param {String} patientName 
 * @param {String} mobileNo 
 * @param {TEXT} disease 
 * @param {DateDataTypes.DATE} queryDateTime 
 * @param {*} assignedDateTime 
 * @returns {boolean}
 */
async function createPatient( 
    userID , patientName , mobileNo , disease , 
    queryDateTime , assignedDateTime ) 
{
    try {
        const newPatient = await Patient.create({
            userID,
            patientName,
            mobileNo,
            disease,
            queryDateTime,
            assignedDateTime
        });

        console.log("Successfully Added Patient record");
        console.log( newPatient.patientId );
        if(newPatient){
            return true;
        }else{
            return false;
        }
        

    } catch (error) {
        console.error("Error during adding patient record: ", error);
        return false;
    }
}


async function getOnePatientData( userId , patientId ) {
    try {
        console.log("this ids============", userId, patientId);

        const patientData = await Patient.findAll({
        where: {
            userID: userId,
            patientId: patientId
        }
        });


        return patientData;

    } catch (error) {
        console.error(`Error while fetching patient:${patientId}'s record: ` );
    }
}


async function getAllPatients(userInput) {
    try {
        
        // const userID = typeof userInput === 'object' && userInput.id
        //     ? userInput.id
        //     : userInput;
        const userID= userInput;

        // console.log("this user id ", userID);
        const patientData = await Patient.findAll({ where: {userID}});
        // console.log("this is data for patient : ", patientData);
        return patientData;
    } catch (error) {
        console.error("Error during getting all patiens in server : " , error);
        return false;
    }
}

async function updatePatientData( updateData) {
    try {
        const userId = updateData.userID;
        const patientId = updateData.patientId;
        // check if it is the autheticated user who created the patient
        // only the user who createds patient can update his details
        const patientData = await Patient.findOne({
            where: {
                userID: userId,
                patientId: patientId
            }
        });

        const isUserCreatedPatient = !!patientData; // true if found, false if not
        if( !isUserCreatedPatient ){
            return 401;
        }
        else{
            const [rowsUpdated] = await Patient.update(updateData, {
                where: { patientId } // condition to find the specific patient
            });

            if (rowsUpdated === 0) {
            console.log("❌ No record found or nothing updated.");
            return false;
            }

            console.log("✅ Patient record updated successfully.");
            return true;
        }



    } catch (error) {
        console.error("Error while upating patien details in server: ", error);
        return false;
    }
}

async function deletePatientRecord(userId, patientId) {
    try {
        // First, find the patient
        const patientData = await Patient.findOne({
            where: {
                userID: userId,
                patientId: patientId
            }
        });

        // If patient not found or not created by user
        if (!patientData) {
            return 401;
        }

        // If patient exists and belongs to user, delete it
        await Patient.destroy({
            where: {
                userID: userId,
                patientId: patientId
            }
        });

        return true;

    } catch (error) {
        console.error("Error during deleting patient's record in service:", error);
        return false;
    }
}



module.exports = { createPatient , getAllPatients , 
            getOnePatientData, updatePatientData , deletePatientRecord
};