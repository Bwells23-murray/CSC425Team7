const User = require('../models/User');

// Helper function to send standardized responses
const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const response = { success };

  if (success && data !== null) {
    response.data = data;
  }

  if (!success && error) {
    response.error = error;
  }

  return res.status(statusCode).json(response);
};

// POST /api/users → Create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    sendResponse(res, 201, true, {
      message: 'User created successfully',
      userData: user
    });
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

// GET /api/users → Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    sendResponse(res, 200, true, {
      users,
      count: users.length
    });
  } catch (error) {
    sendResponse(res, 500, false, null, 'Failed to retrieve users');
  }
};

// GET /api/users/:id → Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, 'User ID is required');
    }

    const user = await User.findById(id);

    if (!user) {
      return sendResponse(res, 404, false, null, 'User not found');
    }

    sendResponse(res, 200, true, { user });
  } catch (error) {
    sendResponse(res, 500, false, null, 'Failed to retrieve user');
  }
};

// PUT /api/users/:id → Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return sendResponse(res, 400, false, null, 'User ID is required');
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return sendResponse(res, 404, false, null, 'User not found');
    }

    sendResponse(res, 200, true, {
      message: 'User updated successfully',
      userData: updatedUser
    });
  } catch (error) {
    sendResponse(res, 500, false, null, 'Failed to update user');
  }
};

// DELETE /api/users/:id → Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, 'User ID is required');
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return sendResponse(res, 404, false, null, 'User not found');
    }

    sendResponse(res, 200, true, {
      message: `User with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    sendResponse(res, 500, false, null, 'Failed to delete user');
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};