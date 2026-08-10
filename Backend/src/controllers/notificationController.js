const Notification = require("../models/Notification");

// @desc    Get all notifications for the current logged-in user
// @route   GET /api/notifications
// @access  Private
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .populate("requestId")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    console.error("Get Notifications Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.json({ success: true, notification });
  } catch (error) {
    console.error("Mark Read Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMyNotifications, markAsRead };
