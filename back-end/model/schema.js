var Schema = {
  student: {
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    full_name: {type: 'string', maxlength: 50, nullable: false},
    birthday: {type: 'string', maxlength: 50, nullable: false},
    deleted: {type: 'string', maxlength: 50, nullable: true},
  },
  class: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false},
    start_date: {type: 'string', maxlength: 150, nullable: false},
    
  },
  class_students: {
    id: {type: 'increments', nullable: false, primary: true},
    student_id: {type: 'integer', nullable: false, unsigned: true},
    class_id: {type: 'integer', nullable: false, unsigned: true},
  }
};
module.exports = Schema;