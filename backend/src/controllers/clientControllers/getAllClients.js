const { supabase } = require('../../../supabase.config'); // Ensure you have the correct Supabase client setup

const fetchAllClients = async (app) => {
    app.get('/get_all_users', async (req, res) => {
        try {
            const { data: users, error } = await supabase
                .from('client_user')
                .select("*"); // Add other fields you want to return

            if (error) {
                // Return error response if something goes wrong
                return res.status(400).json({ message: error.message });
            }

            // If no errors, send the users data as a response
            res.status(200).json(users);
        } catch (err) {
            // Handle unexpected errors
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    });
};

module.exports = { fetchAllClients };
