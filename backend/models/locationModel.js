const connection = require('./db');

function getLocations() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT location_id, location_name FROM locationtable";
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getLocations,
};
