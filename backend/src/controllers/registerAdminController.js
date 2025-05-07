import supabase from '../../../supabase.config.js'; // ✅ correct for default export
import bcrypt from 'bcrypt'; // Import bcrypt

// Controller to handle user registration
const registerClientUser = async (app) => {
    app.post('/admin_registration', async (req, res) => {
        const {
            username,
            email,
            password,
        } = req.body;




        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check if the email or username already exists in the database
        const { data: existingUserEmail, error: existingUserEmailError } = await supabase
            .from('admin_users')
            .select('id')
            .eq('email', email) // You can also check for username here if needed
            .single(); // Use .single() to get a single record, not an array


        if (existingUserEmailError && existingUserEmailError.code !== 'PGRST116') {
            return res.status(500).json({ message: existingUserEmailError.message });
        }

        if (existingUserEmail) {
            return res.status(201).json({ message: 'Email already exists' });
        }

        const { data: existingUserUsername, error: existingUseUsernamerError } = await supabase
            .from('admin_users')
            .select('id')
            .eq('email', email) // You can also check for username here if needed
            .single(); // Use .single() to get a single record, not an array

        if (existingUseUsernamerError && existingUseUsernamerError.code !== 'PGRST116') {
            return res.status(500).json({ message: existingUseUsernamerError.message });
        }

        if (existingUserUsername) {
            return res.status(201).json({ message: 'Username already exists' });
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const randomAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`
        // Insert user into Supabase users table
        const { data, error } = await supabase
            .from('admin_users') // Replace with your table name if different
            .insert([
                {
                    username: username,
                    email: email,
                    password: hashedPassword, // Store the hashed password
                    profile_picture_url: randomAvatar
                },
            ]);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json({ message: 'User registered successfully' });
    });
};

export default registerClientUser;
