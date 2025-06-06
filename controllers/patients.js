const moment = require('moment');
const patientService = require("../services/patient");

async function createPatient(req , res) {
    try {
        const { userID, patientName , mobileNo , disease , 
            queryDateTime , assignedDateTime 
        } = req.body;

        // check validations for userID , patientName , disease 
        if( !userID || !patientName || !disease ){
            return res.status(400).json({ value: false,  message: "kindly fill all necessary detials (userID, patientName , mobileNo , disease)" });
        }
        // we will check the validations for mobileno and dates here

        const mobileRegex = /^[6-9]\d{9}$/;
        if( !mobileNo ){
            return res.status(400).json({ value: false , message: "Mobile No is required" })
        }
        if( !mobileRegex.test(mobileNo) ){
            return res.status(400).json({ value: false , message: "Mobile number must be 10 digits and start with 6, 7, 8, or 9." })
        }

        // checking datetime
        // format:   YYYY-MM-DD HH:MM:SS
        // if( !assignedDateTime ){
        //     return res.status(400).json({ value: false, message: "Please Enter a Valid Datetime Format (YYYY-MM-DD HH:MM:SS)" });
        // }

        // const isValidDateTime = checkValidDateTime(assignedDateTime);
        // if( !isValidDateTime ){
        //     return res.status(400).json({ value: false , message: "please enter valid datetime format (YYYY-MM-DD HH:MM:SS)" })
        // }

        // till here the mobileno and datetime testcases are done
        // lets add the patient record now
        const addPatient = patientService.createPatient(
            userID, patientName , mobileNo , disease , queryDateTime , assignedDateTime
        );

        if( !addPatient ){
            return res.status(400).json({ value: false , message: "Error during adding patient record" });
        }
        else{
            return res.status(200).json({ value: true , message: "Successfully Added Patient Record" });
        }
        
        
    } catch (error) {
        console.error("Error during creating patient : " , error);
    }
}

async function getAllPatients( req , res) {
    try {
        const { userID }  = req.body;
        if( !userID){
            return res.status(400).json({ success: false , messsage: "user id is required"})
        }

        console.log("user id in controller : ", userID);
        const responseData = await patientService.getAllPatients(userID);
        if( !responseData ){
            // return res.status(400).json({ success: false , message: `Error during retrival of all patient data for user: ${userID}` });
            console.log("empty data");
        }
        else if( responseData ){
            return res.status(200).json({ 
                success: true , 
                message: `Successfully fetched the data of all Patient for user: ${userID}`,
                data: responseData
            });
        }
        
    } catch (error) {
        console.error("Error during getting all patients in controller  : " , error);
    }
}

async function getOnePatientData( req , res){
    try {
        const patientId = req.params.id;
        const userId = req.body.userID;

        if( !patientId || !userId){
            return res.status(400).json({ message: "please provide patient id in url (eg. 1 or 2) and userID in req.body"});
        }

        const patientData = await patientService.getOnePatientData(userId , patientId);
        if( !patientData ){
            // return res.status(400).json({ success: false , message: "invalid userId or patientId" });
        }
        else{
            return res.status(200).json({ 
                success: true, 
                message: `successfully fetched record of patient: ${patientId}`,
                data: patientData
            });
        }

    } catch (error) {
        console.error("Error during getting data for one patient in controller : " , error);
        return res.status(500).json({ success: false , message: "internal server error : error while processing your request" })
    }
}

async function updatePatientRecord(req , res) {
    try {
        const { userID ,patientName , mobileNo , disease } = req.body;
        const patientId = req.params.id;

        if( !userID || !patientId ){
            return res.status(400).json({ message: "please provide patient id in url (eg. 1 or 2) and userID in req.body"});
        }

        // if( !patientName , !mobileNo , !disease){
        //     return res.status(400).json({ message: "please provide patientName , mobileNo , disease in req.body"});
        // }

        updateData = {}
        if (userID) updateData.userID = userID;
        if (patientId) updateData.patientId = patientId;
        if (patientName) updateData.patientName = patientName;
        if (mobileNo) updateData.mobileNo = mobileNo;
        if (disease) updateData.disease = disease;

        const isUpdated = await patientService.updatePatientData( updateData );

        if( isUpdated === 401 ){
            res.status(401).json("you are not allowed to change this patient's data");
        }
        if( !isUpdated ){
            res.status(401).json("no such record found for update");
        }

        else{
            res.status(200).json({ success: true , message: "successfully updated the patient data"});
        }

    } catch (error) {
        console.error("Error during updating patiend's record in controller");
        res.status(500).json({ success: false , message: "Internal server error: error while updating patien's data"});
    }
}

async function deletePatientRecord( req , res) {
    try {
        
        const { userID } = req.body;
        const patientId = req.params.id;

        if( !userID || !patientId ){
            return res.status(400).json({ message: "please provide patient id in url (eg. 1 or 2) and userID in req.body"});
        }

        // if( !patientName , !mobileNo , !disease){
        //     return res.status(400).json({ message: "please provide patientName , mobileNo , disease in req.body"});
        // }

        

        const isUpdated = await patientService.deletePatientRecord( userID , patientId );

        if( isUpdated === 401 ){
            res.status(401).json("you are not allowed to change this patient's data");
        }
        if( !isUpdated ){
            res.status(401).json("no such record found for delete");
        }

        else{
            res.status(200).json({ success: true , message: "successfully deleted the patient data"});
        }


    } catch (error) {
        console.error("Error during deleting patiend's record in controller");
        res.status(500).json({ success: false , message: "Internal server error: error while deleting patien's data"});
    }
}

function checkValidDateTime( dateTime ){
    const isValid = moment(dateTime, 'YYYY-MM-DD HH:MM:SS' , true ).isValid();
    if( !isValid ){
        return false
    }
    return true;
}

module.exports = { createPatient , checkValidDateTime , 
                    getAllPatients  , getOnePatientData,
                    updatePatientRecord , deletePatientRecord
                };