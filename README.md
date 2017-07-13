# students-task
Student and classes task

## Back-end 
Go to the back-end folder and run 
```bash
npm install 
```
To strt NodeJs app
```bash
npm start
```
Edit config in .inv file
To install tables run this

```bash
node install.js
```

open http://localhost:3001/
and  http://localhost:3001/install to start installing

## Api
```
GET     http://localhost:4000/student/  - list all
POST    http://localhost:4000/student/  - Create new
GET     http://localhost:4000/student/1 - show details 1 is ID number
DELETE  http://localhost:4000/student/1 - delete by id

GET     http://localhost:4000/class/  - list all
POST    http://localhost:4000/class/  - Create new
GET     http://localhost:4000/class/1 - show details 1 is ID number
DELETE  http://localhost:4000/class/1 - delete by id

GET     http://localhost:4000/joined/  - list of all Joined
POST    http://localhost:4000/joined/  - Create new Join Class
GET     http://localhost:4000/joined/1 - show all class students
DELETE  http://localhost:4000/joined/1 - leave class by id


GET     http://localhost:4000/search/student/1  - check if student exists
GET     http://localhost:4000/search/class/1    - check if class exists
```

## Front-end 
Go to the front-end folder and run 
```bash
npm install 
```
To strt AngularJs app
```bash
ng serve
```
