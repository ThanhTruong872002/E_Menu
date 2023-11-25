const bookTableModel = require('../models/bookTableModel');
const dayjs = require('dayjs');

async function createReservation(req, res) {
  try {
    const { name, phone_number, total_person, date, time } = req.body;

    const reservationDate = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

    const result = await bookTableModel.createNewReservation(name, phone_number, total_person, reservationDate, 1);

    const reservationId = result.insertId;

    res.status(200).json({
      success: true,
      message: 'Reservation created successfully',
      reservation_id: reservationId,
    });
  } catch (error) {
    console.error('Error creating the reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create the reservation',
      error: error.message,
    });
  }
}

module.exports = {
  createReservation,
};
