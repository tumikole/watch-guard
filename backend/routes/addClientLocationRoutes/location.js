const { getClient } = require("../../database/db");

const client = getClient();

const addClientLocation = app => {
    app.post('/register_client_location', async (req, res) => {
        const { location, email, brand } = req.body;
        console.log("first", { location, email, brand })
        // Input validation
        if (!location || !email || !brand) {
            return res.status(400).json({ message: "Location, email, and brand are required." });
        }

        // Check if the location or brand already exists
        const checkQuery = `
            SELECT * FROM user_brand_label_location 
            WHERE client_location = ? OR brand_name = ?
        `;

        try {
            // Check for existing location or brand
            const [existingRecords] = await client.promise().query(checkQuery, [location, brand]);

            if (existingRecords.length > 0) {
                // If location or brand exists, send a message indicating that
                return res.status(409).json({
                    message: "The location or brand already exists.",
                    existingRecords: existingRecords
                });
            }

            // Insert query to add the new location if it doesn't exist
            const insertQuery = `
            INSERT INTO user_brand_label_location (brand_name, client_email, client_location)
            VALUES (?, ?, ?)
        `;
        
            const values = [brand, email, location];

            // Insert data into the MySQL database using the pool
            const [result] = await client.promise().query(insertQuery, values);

            // Sending response with the inserted data
            res.status(201).json({
                message: "Location registered successfully!",
                clientLocation: {
                    id: result.insertId,
                    brand_name: brand,
                    client_email: email,
                    client_location: location,
                    created_at: new Date().toISOString(),
                }
            });
        } catch (error) {
            console.error("Error inserting client location:", error);
            res.status(500).json({
                message: "Registration failed. Please try again.",
                error: error.message,
            });
        }
    });
};

module.exports = { addClientLocation }