const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./models");

const authRoute = require("./routes/auth");
const doctorsRoute = require("./routes/doctorsRoute");
const patientRoute = require("./routes/patientsRoute");
const mappingsRoute = require("./routes/mappingsRoute");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());


// Routes
app.use("/api/auth" , authRoute);
app.use("/api/patients" , patientRoute);
app.use("/api/doctors" , doctorsRoute);
app.use("/api/mappings" , mappingsRoute );

// use { force: true } if you want to drop tables each time 
// (dev only) else use { alter: true } in production
db.sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('✅ Database synced.');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });