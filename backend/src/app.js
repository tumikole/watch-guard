const express = require("express");
const app = express();
const cors = require("cors");
const { adminLogin } = require('./controllers/adminLoginController')
const { fetchAllClients } = require('./controllers/clientControllers/getAllClients')
const { getSubscriptions } = require('./controllers/subscriptionsController/subscriptionsController');
const { addLocation } = require("./controllers/locationControllers/addlocationController");


app.use(cors());
app.use(express.json({
  limit: "10000000mb"
}));
app.use(express.urlencoded({
  limit: "10000000mb",
  extended: true
}));

adminLogin(app)
fetchAllClients(app)
getSubscriptions(app)
addLocation(app)
app.listen(4000, () => {
  console.log("Server running on port 4000");
});