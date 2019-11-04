import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  courses:any = [];
  private coursesSub: Subscription;
  userIsAdmin : boolean = false;
  private adminListenerSub : Subscription;
  
  constructor(private courseService: CoursesService,private authService : AuthService,private http : HttpClient) { }

  ngOnInit() {
    
    this.userIsAdmin = this.authService.getIsAdmin();  
    

    this.courseService.getCourses();
    this.coursesSub = this.courseService.getCoursesUpdateListner().subscribe(data=>{
      this.courses = data;      
    });

  }

  deleteCourse(id : string){
    this.courseService.deleteCourse(id);
    this.coursesSub = this.courseService.getCoursesUpdateListner().subscribe(data=>{
      this.courses = data;      
    });
  }

  registerCourse(id:string,title : string, author : string, skills : string[]){
    console.log(title);
    this.courseService.enrollCourse(title,author,skills);
    const name = this.authService.getUserName();
    this.http.patch('http://localhost:3000/courses/'+id,{name : name}).subscribe(response=>{
      console.log(response);
    });
    alert("registered sucessfully");
  }


}
