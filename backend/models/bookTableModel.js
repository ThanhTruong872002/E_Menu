const util = require('util');
const connection = require('./db');
const dayjs = require('dayjs');

const queryAsync = util.promisify(connection.query).bind(connection);

async function createNewReservation(cus_name, cus_phone, number_of_guests, reservation_date, status) {
  try {
    const formattedDate = dayjs(reservation_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

    const sql = `
      INSERT INTO reservation (cus_name, cus_phone, number_of_guests, reservation_date, status) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await queryAsync(sql, [cus_name, cus_phone, number_of_guests, formattedDate, status]);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createNewReservation,
};
