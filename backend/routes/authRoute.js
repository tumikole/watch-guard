const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4 } = require('uuid');
const { getClient } = require("../database/db");


dotenv.config();

const client = getClient();
const registerUser = (app) => {
    app.post("/register", async (req, res) => {
        try {
            const {
                cellNumber,
                password,
                firstName,
                lastName,
                email,
                username,
            } = req.body;

            const brand = "Support"
            // 🔹 Validate required fields
            if (!cellNumber || !password || !firstName || !lastName || !email || !username) {
                return res.status(400).json({ message: "❌ All fields except reference number are required." });
            }

            // 🔹 Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 🔹 Check if user already exists
            const checkUserQuery = "SELECT * FROM support_user WHERE cell_number = ?";
            const [existingUser] = await client.promise().query(checkUserQuery, [email]);

            if (existingUser.length > 0) {
                return res.status(409).json({
                    message: "❌ The user with the provided email already exists.",
                });
            }

            // 🔹 Insert the user into the DB with all details
            const insertQuery = `
                INSERT INTO support_user (cell_number, password, brand, first_name, last_name, email, username, active) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const [insertResults] = await client
                .promise()
                .query(insertQuery, [
                    cellNumber,
                    hashedPassword,
                    brand,
                    firstName,
                    lastName,
                    email,
                    username,
                    true, // Sets active status
                ]);

            return res.status(201).json({
                message: "✅ User registered successfully!",
                user: insertResults,
            });
        } catch (error) {
            console.error("❌ Error registering user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};

const registerClient = (app) => {
    app.post("/register_client", async (req, res) => {
        try {
            const {
                cell_number,
                location,
                first_name,
                last_name,
                email,
                brand,
            } = req.body;

            const password = null;
            const reference_number = v4() + first_name.toLowerCase() + v4() ; 
            const username = null;

            console.log({ cell_number, location, first_name, last_name, email, reference_number, brand });

            // 🔹 Validate required fields
            if (!cell_number || !first_name || !last_name || !email || !brand || !location) {
                return res.status(400).json({ message: "❌ All fields except username are required." });
            }

            // 🔹 Check if client already exists
            const checkClientUserQuery = "SELECT * FROM client WHERE email = ?";
            const [existingClient] = await client.promise().query(checkClientUserQuery, [email]);

            if (existingClient.length > 0) {
                return res.status(409).json({
                    message: "❌ The client with the provided email already exists.",
                });
            }

            // 🔹 Insert the client into the `client` table
            const insertQuery = `
                INSERT INTO client (cell_number, password, brand, location, username, first_name, last_name, email, reference_number, active) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            await client.promise().query(insertQuery, [
                cell_number,
                password,
                brand,
                location,
                username,
                first_name,
                last_name,
                email,
                reference_number,
                true, // Sets active status
            ]);

            return res.status(201).json({
                message: "✅ Client registered successfully!",
            });
        } catch (error) {
            console.error("❌ Error registering client:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};

const loginUser = (app) => {
    app.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log({ email, password });

            if (!email || !password) {
                return res.status(400).json({ message: "❌ Email and password are required" });
            }

            // 🔹 Find user in all three tables
            const queries = [
                { table: "client", query: "SELECT * FROM client WHERE email = ?" },
                { table: "client_user", query: "SELECT * FROM client_user WHERE email = ?" },
                { table: "support_user", query: "SELECT * FROM support_user WHERE email = ?" }
            ];

            let user = null;
            let userType = null;

            for (const { table, query } of queries) {
                const [results] = await client.promise().query(query, [email]);
                if (results.length > 0) {
                    user = results[0];
                    console.log({user})
                    userType = table;
                    break; // Stop searching once we find the user
                }
            }

            if (!user) {
                return res.status(401).json({ message: "❌ Invalid email or password" });
            }

            console.log(`✅ User found in ${userType}:`, user);

            // 🔹 Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "❌ Invalid email or password" });
            }

            // 🔹 Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, userType },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                message: "✅ Login successful",
                token,
                user,
                userType
            });

        } catch (error) {
            console.error("❌ Error during login:", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    });
};



module.exports = { registerUser, loginUser, registerClient }