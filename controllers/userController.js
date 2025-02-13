const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');

dotenv.config();

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await User.createUser(name, email, hashedPassword, role);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    
    try {
        await User.updateUser(id, name, email, role);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        await User.deleteUser(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};
