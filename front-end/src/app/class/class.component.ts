import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  Classs: Class[];
  showModal = false;
  data: Class;
  showRow = [];

  constructor( private ClassService: ClassesService) { }

  ngOnInit() {
    var self = this;
    self.data = {
      id: 0,
      full_name: '',
      email: '',
      birthday: '',
      deleted: null
    };

    self.ClassService.getAll().subscribe(Class => {
      self.Classs = Class;
      Class.forEach(function(t){
        if(t.hasOwnProperty('id')){
          self.showRow[t.id] = false;
        }
      });
        console.log(self.Classs);
    });

  }

  addnew(){
    this.showModal = true;
  }

  addEdit(){
    var self = this;
    if(self.data.hasOwnProperty('id') && self.data.id > 0){
      self.ClassService.update(self.data).subscribe(data => {
        console.log(data);
      });
    }else{
      self.ClassService.create(self.data).subscribe(data => {
        console.log(data.id);
        self.data.id = data.id;
        self.Classs[self.Classs.length] = self.data;

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
    this.ClassService.delete(id).subscribe(data => {
        this.Classs.splice(index, 1);
    });
  }

}
interface Class {
  id?: number,
  full_name: string,
  email: string,
  birthday: string,
  deleted: boolean

}

