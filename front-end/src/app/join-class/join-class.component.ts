import { ClassStudentsService } from './../class-students.service';
import { StudentService } from './../student.service';
import { ClassesService } from './../classes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.component.html',
  styleUrls: ['./join-class.component.css']
})
export class JoinClassComponent implements OnInit {
  joined: Joined[];
  showModal = false;
  data: Joined;
  foundStudent = false;
  foundClass = false;
  formErrorMessage = '';
  studentsList = [];
  classesList = [];

  constructor( private classStudentsService: ClassStudentsService, private studentService: StudentService, private classesService: ClassesService) { }

  ngOnInit() {
    var self = this;
    self.data = {
      id: 0,
      student_id: 0,
      student_name: '',
      class_id: 0,
      class_name:''
    };

    self.studentService.getAll().subscribe(student => {
      student.forEach(element => {
        self.studentsList[element.id] = element;
      });
    });

    self.classesService.getAll().subscribe(classes => {
      classes.forEach(element => {
        self.classesList[element.id] = element;
      });
    });

    self.classStudentsService.joined().subscribe(joined => {
      self.joined = joined;
    });

    setTimeout(function () {
      self.reload();
    }, 1000);

  }

  join(){
    this.showModal = true;
  }

  getName(id, type){
    if(type == 'student'){
      if(this.studentsList[id]){
        return this.studentsList[id].full_name;
      }else{
        return id;
      }
    }else{
      if(this.classesList[id]){
        return this.classesList[id].name
      }else{
        return id;
      }
    }
  }

  reload(){
    var self = this;
    this.joined.forEach(function(e, k){
      self.joined[k].class_id = self.getName(e.class_id, 'class');
      self.joined[k].student_id = self.getName(e.student_id, 'student');
       console.log(self.studentsList);
       console.log(self.classesList);
      
    });
  }

  studentSearch(e){
    var self = this;
    this.classStudentsService.studentSearch(e).subscribe(data => {
      if(data.hasOwnProperty('id')){
        self.data.student_id = data.id;
        self.foundStudent = true;
      }else{
        self.data.student_id = 0;
        self.foundStudent = false;
      }
    });
  }

  classSearch(e){
    var self = this;
    this.classStudentsService.classSearch(e).subscribe(data => {
      if(data.hasOwnProperty('id')){
        self.data.class_id = data.id;
        self.foundClass = true;
      }else{
        self.data.class_id = 0;
        self.foundClass = false;
      }
    });
  }

  addEdit(){
    var self = this;
    if(self.data.hasOwnProperty('id') && self.data.id > 0){
      // self.classStudentsService.update(self.data).subscribe(data => {
      //   console.log(data);
      // });
    }else{
      if(self.data.student_id > 0 && self.data.class_id > 0){
        var datasave = {
          student_id: self.data.student_id,
          class_id: self.data.class_id
        };
        self.classStudentsService.create(self.data).subscribe(data => {
          console.log(data.id);
          self.data.id = data.id;
          self.joined[self.joined.length] = self.data;

          self.data = {
            id: 0,
            student_id: 0,
            student_name: '',
            class_id: 0,
            class_name:''
          };
          this.showModal = false;
          
        });
      }else{
        self.formErrorMessage = 'Can`t found Student OR Class';

      }
    }
  }

  delete(id:number, index:number){
    this.classStudentsService.delete(id).subscribe(data => {
        this.joined.splice(index, 1);
    });
  }

}
interface Joined {
  id?: number,
  student_id: number,
  student_name?: string,
  class_id: number,
  class_name?: string

}