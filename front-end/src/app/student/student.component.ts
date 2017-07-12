import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[];
  showModal = false;
  data: Student;
  showRow = [];

  constructor( private studentService: StudentService) { }

  ngOnInit() {
    var self = this;
    self.data = {
      id: 0,
      full_name: '',
      email: '',
      birthday: '',
      deleted: null
    };

    self.studentService.getAll().subscribe(student => {
      self.students = student;
      student.forEach(function(t){
        if(t.hasOwnProperty('id')){
          self.showRow[t.id] = false;
        }
      });
        console.log(self.students);
    });

  }

  addnew(){
    this.showModal = true;
  }

  addEdit(){
    var self = this;
    if(self.data.hasOwnProperty('id') && self.data.id > 0){
      self.studentService.update(self.data).subscribe(data => {
        console.log(data);
      });
    }else{
      self.studentService.create(self.data).subscribe(data => {
        console.log(data.id);
        self.data.id = data.id;
        self.students[self.students.length] = self.data;

        self.data = {
          id: 0,
          full_name: '',
          email: '',
          birthday: '',
          deleted: null
        };
        this.showModal = false;
        
      });
    }
  }

  delete(id:number, index:number){
    this.studentService.delete(id).subscribe(data => {
        this.students.splice(index, 1);
    });
  }

}
interface Student {
  id?: number,
  full_name: string,
  email: string,
  birthday: string,
  deleted: boolean

}
