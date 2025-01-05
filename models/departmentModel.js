const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    dept_name: String,
    dept_code: String
});

module.exports = mongoose.model('Department', departmentSchema);
