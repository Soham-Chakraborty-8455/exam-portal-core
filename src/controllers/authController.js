const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Signup
exports.signup = async (req, res) => {
    const { name, email, phone_number, password, type } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            phone_number,
            password: hashedPassword,
            type
        });

        req.session.user = user;
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.user = user;
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving session', error: err });
            }

            res.status(200).json({ message: 'Login successful', user });
        });
        // res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};
