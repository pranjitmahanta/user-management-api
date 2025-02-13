const express = require('express');
const { registerUser, getAllUsers, updateUser, deleteUser, loginUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/users', registerUser);
router.post('/login', loginUser);
router.get('/users', authenticateToken, getAllUsers);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

module.exports = router;
