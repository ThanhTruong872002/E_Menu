const locationModel = require('../models/locationModel');

async function getLocations(req, res) {
  try {
    const locations = await locationModel.getLocations();
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách địa điểm",
      error: error.message,
    });
  }
}

module.exports = {
  getLocations,
};
