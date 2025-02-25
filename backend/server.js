const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const { registerUser, loginUser, registerClient } = require("./routes/authRoute.js");
const {addClientLocation} = require('./routes/addClientLocationRoutes/location.js')


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Routes
registerUser(app)
loginUser(app)
registerClient(app)
addClientLocation(app)

app.get("/", (req, res) => {
    res.send("🚀 Server is running...");
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
