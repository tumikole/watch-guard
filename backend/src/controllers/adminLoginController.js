const { supabase } = require('../../supabase.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // You should store this securely in an .env file

const adminLogin = async (app) => {
    app.post('/admin_login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Fetch user by email
        const { data: user, error } = await supabase
            .from('admin_users')
            .select("*") // Add other fields you want to return
            .eq('email', email)
            .single();
        console.log({ user })
        if (error || !user) {
            return res.json({ message: 'Invalid email or password', status: 401 });
        }

        // Compare passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ message: 'Invalid email or password', status: 301 });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Return token and user info
        return res.status(200).json({
            message: 'Login successful',
            token,
            user,
        });
    });
};

module.exports = { adminLogin };
