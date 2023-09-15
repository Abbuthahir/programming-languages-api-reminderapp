const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM reminderApp.myList;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function create(check) {
  const result = await db.query(
    `INSERT INTO reminderApp.myList 
    (selectedColor, selectedIcon, inputValue) 
    VALUES 
    ('${check.selectedColor}', '${check.selectedIcon}', '${check.inputValue}')`
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return { message };
}
async function remove(inputValue) {
  const result = await db.query(
    `DELETE FROM naturesPantry.products WHERE inputValue='${inputValue}'`
  );

  let message = 'Error in deleting programming language';

  if (result.affectedRows) {
    message = 'Programming language deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  remove
}