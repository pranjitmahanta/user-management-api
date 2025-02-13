const pool = require('../config/db');

const createUser = async (name, email, hashedPassword, role) => {
    const [result] = await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
        [name, email, hashedPassword, role]);
    return result;
};

const getAllUsers = async () => {
    const [users] = await pool.query("SELECT id, name, email, role FROM users");
    return users;
};

const updateUser = async (id, name, email, role) => {
    const [result] = await pool.query("UPDATE users SET name=?, email=?, role=? WHERE id=?", 
        [name, email, role, id]);
    return result;
};

const deleteUser = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);
    return result;
};

const getUserByEmail = async (email) => {
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    return users[0];
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser, getUserByEmail };
