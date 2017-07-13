import { ClassStudentsService } from './class-students.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppConfigModule } from './config/config.module';
import { StudentComponent } from './student/student.component';
import { ClassComponent } from './class/class.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { StudentService } from './student.service';
import { ClassesService } from './classes.service';
import { JoinClassComponent } from './join-class/join-class.component';
import { LeaveClassComponent } from './leave-class/leave-class.component';


const appRoutes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: 'class',  component: ClassComponent },
  { path: 'join',  component: JoinClassComponent },
  { path: 'leave',  component: LeaveClassComponent },

  { path: '**', component: NotfoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    ClassComponent,
    NotfoundComponent,
    JoinClassComponent,
    LeaveClassComponent
  ],
  imports: [
    BrowserModule,
    AppConfigModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [StudentService, ClassesService, ClassStudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
