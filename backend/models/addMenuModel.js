const fs = require("fs");
const path = require("path");
const connection = require("./db");

class AddMenuModel {
    static uploadImage(imageFile, callback) {
        if (!imageFile) {
          return callback(null);
        }
    
        const tempPath = imageFile.path;
        const extension = path.extname(imageFile.originalname);
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        const targetPath = `backend/uploads/images/image${uniqueSuffix}${extension}`;
    
        fs.rename(tempPath, targetPath, (err) => {
          if (err) {
            callback(null);
          } else {
            const imageURL = `/images/image${uniqueSuffix}${extension}`;
            callback(imageURL);
          }
        });
    }

    static addDish(menu_item_name, Description, Price, category_id, imageFileName, callback) {
        const sql =
          "INSERT INTO menu (menu_item_name, Description, Price, category_id, Image) VALUES (?, ?, ?, ?, ?)";
        connection.query(
          sql,
          [menu_item_name, Description, Price, category_id, imageFileName],
          function (err, result) {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          }
        );
      }

      static getTypes(callback) {
        const sql = "SELECT * FROM foodcategor";
        connection.query(sql, (err, results) => {
          if (err) {
            callback(err);
          } else {
            callback(null, results);
          }
        });
      }
}

module.exports = AddMenuModel;