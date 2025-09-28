const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// POST /api/users → Create a new user
router.post('/users', createUser);

// GET /api/users → Get all users
router.get('/users', getAllUsers);

// GET /api/users/:id → Get a specific user by ID
router.get('/users/:id', getUserById);

// PUT /api/users/:id → Update a user by ID
router.put('/users/:id', updateUser);

// DELETE /api/users/:id → Delete a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;