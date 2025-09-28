const Message = require('../models/Message');

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

// POST /api/messages → Create a new message
const createMessage = async (req, res) => {
  try {
    const message = await Message.create({
      author: req.body.author,
      text: req.body.text
    });

    sendResponse(res, 201, true, {
      message: "Message created successfully",
      messageData: message
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to create message");
  }
};

// GET /api/messages → Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find(); // fetch all messages

    sendResponse(res, 200, true, {
      messages,
      count: messages.length
    });
  } catch (error) {
    sendResponse(res, 500, false, null, 'Failed to retrieve messages');
  }
};

// GET /api/messages/:id → Get a specific message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    const message = await Message.findById(id);

    if (!message) {
      return sendResponse(res, 404, false, null, "Message not found");
    }

    sendResponse(res, 200, true, { message });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve message");
  }
};

// PUT /api/messages/:id → Update a message by ID
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    const updatedMessage = await Message.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedMessage) {
      return sendResponse(res, 404, false, null, "Message not found");
    }

    sendResponse(res, 200, true, {
      message: "Message updated successfully",
      messageData: updatedMessage
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to update message");
  }
};

// DELETE /api/messages/:id → Delete a message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return sendResponse(res, 404, false, null, "Message not found");
    }

    sendResponse(res, 200, true, {
      message: `Message with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to delete message");
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};