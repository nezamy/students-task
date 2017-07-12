var db = require('../system/model');
var Student = db.Model.extend({
    tableName: 'student'
});
module.exports = Student;