
# MediSync - Clinic Management System

---

## 🔧 Environment Setup (.env)

Before running the application, you must configure your environment variables. Create a `.env` file in your project root directory with the following variables:

```env
PORT=5000
SECRET_KEY=your_jwt_secret_key_here

DB_NAME=your_database_name
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
```

- `PORT`: The port number your Node.js server will listen on.
- `SECRET_KEY`: Secret key used for signing JWT tokens for user authentication.
- `DB_NAME`: Name of your PostgreSQL database.
- `DB_USER`: Username for the PostgreSQL database.
- `DB_PASSWORD`: Password for the PostgreSQL user.
- `DB_HOST`: Host address of the PostgreSQL server (e.g., localhost or an IP).
- `DB_PORT`: Port on which your PostgreSQL server is running (default is usually 5432).

> **Security Note:**  
> Never commit your `.env` file to any public repository. Add `.env` to your `.gitignore` file to keep sensitive data secure.

---

## 📋 Overview

MediSync is a basic clinic management system that allows authenticated users to manage doctors, patients, and doctor-patient assignments.

---

## 👥 User Features

* Only registered and authenticated users can log in.
* Authenticated users can:

  - Add patients and doctors.
  - View only patients they have added.
  - View all doctors (regardless of who added them).
  - Perform GET, PUT, DELETE operations on patients and doctors.
  - Assign doctors to patients.
  - Retrieve all doctor-patient mappings.
  - Get doctors assigned to a specific patient.
  - Remove doctor assignments from patients.

---

## 🗃️ Data Structure

### User

| Field    | Description              |
| -------- | ------------------------ |
| `userID` | Unique user identifier   |
| `email`  | User email address       |
| `password` | User hashed password    |

### Patient

| Field           | Description                     |
| --------------- | -------------------------------|
| `patientId`     | Unique patient identifier       |
| `userID`        | ID of the user who added patient|
| `patientName`   | Patient's full name             |
| `mobileNo`      | Patient's mobile number         |
| `disease`       | Disease or medical condition    |
| `queryDateTime` | Timestamp when patient queried  |
| `assignedDateTime` | Timestamp when doctor assigned|

### Doctor

| Field       | Description                |
| ----------- | -------------------------- |
| `doctorId`  | Unique doctor identifier   |
| `name`      | Doctor's full name         |
| `email`     | Doctor's email address     |
| `mobileNo`  | Doctor's contact number    |
| `qualification` | Doctor's professional qualification |

---

## 🔐 1. Authentication APIs

### Register User

`POST /api/auth/register`

**Request body example:**

```json
{
  "username": "test_user",
  "email": "user123@example.com",
  "password": "StrongPass@123",
  "confirmPassword": "StrongPass@123"
}
```

### Login User

`POST /api/auth/login`

**Request body example:**

```json
{
  "email": "user123@example.com",
  "password": "StrongPass@123"
}
```

> **Note:** Response includes `userID`, which is required for further API calls.

---

## 🧑‍⚕️ 2. Patient Management APIs

### Add Patient

`POST /api/patients`

**Request body example:**

```json
{
  "userID": 101,
  "patientName": "Jane Doe",
  "mobileNo": "9876543210",
  "disease": "Hypertension",
  "queryDateTime": "2025-06-06T10:30:00Z",
  "assignedDateTime": "2025-06-06T12:00:00Z"
}
```

### Get All Patients by User

`GET /api/patients`

**Request body example:**

```json
{
  "userID": 101
}
```

### Get Patient by ID

`GET /api/patients/:id`

**Request body example:**

```json
{
  "userID": 101
}
```

### Update Patient

`PUT /api/patients/:id`

**Request body example:**

```json
{
  "userID": 101,
  "patientName": "Updated Jane Doe",
  "mobileNo": "9876543210",
  "disease": "Updated Hypertension"
}
```

### Delete Patient

`DELETE /api/patients/:id`

**Request body example:**

```json
{
  "userID": 101
}
```

> Use the `userID` returned from login for these operations.

---

## 👨‍⚕️ 3. Doctor Management APIs

### Add Doctor

`POST /api/doctors`

**Request body example:**

```json
{
  "userID": 202,
  "name": "Test User",
  "email": "user202@example.com",
  "mobileNo": "9123456780",
  "qualification": "MBBS"
}
```

### Get All Doctors

`GET /api/doctors`

_No request body needed._

### Get Doctor by ID

`GET /api/doctors/:id`

_No request body needed._

### Update Doctor

`PUT /api/doctors/:id`

**Request body example:**

```json
{
  "userID": 202,
  "name": "Updated User",
  "email": "update_user@example.com",
  "mobileNo": "9123456780",
  "qualification": "Updated MBBS"
}
```

---

## 🔗 4. Patient-Doctor Mapping APIs

Base URL: `http://localhost:5000/api/mappings`

### Assign Doctor to Patient

`POST /api/mappings`

**Request body example:**

```json
{
  "patientId": 1,
  "doctorId": 2,
  "assignedBy": 3
}
```

**Response example:**

```json
{
  "id": 1,
  "patientId": 1,
  "doctorId": 2,
  "assignedBy": 3,
  "assignedDateTime": "2025-06-06T12:00:00.000Z"
}
```

**Errors:**

* 400 Bad Request – Missing fields or invalid foreign keys
* 500 Internal Server Error – Database/server error

### Get All Mappings

`GET /api/mappings`

**Response example:**

```json
[
  {
    "id": 1,
    "assignedDateTime": "2025-06-06T12:00:00.000Z",
    "Patient": {
      "patientId": 1,
      "patientName": "John Doe"
    },
    "Doctor": {
      "doctorId": 2,
      "doctorName": "Dr. Smith"
    },
    "AssignedByUser": {
      "userID": 3,
      "name": "Admin"
    }
  }
]
```

### Get Mappings by Patient ID

`GET /api/mappings/:patientId`

**Response example:**

```json
[
  {
    "id": 1,
    "doctorId": 2,
    "assignedBy": 3,
    "Doctor": {
      "doctorId": 2,
      "doctorName": "Dr. Smith"
    },
    "AssignedByUser": {
      "userID": 3,
      "name": "Admin"
    }
  }
]
```

### Delete Mapping

`DELETE /api/mappings/:id`

**Response example:**

```json
{
  "message": "Mapping deleted successfully"
}
```

**Error:**

* 404 Not Found – If mapping ID does not exist

---

## 🧪 Testing Note

Make sure to create the user, patient, and doctor before creating a mapping to avoid foreign key constraint errors.

---

## 🧾 License

This project is open-source and free to use for educational purposes.
