import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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
  
  constructor(private courseService: CoursesService,private authService : AuthService) { }

  ngOnInit() {
    
    this.userIsAdmin = this.authService.getIsAdmin();  
    

    this.courseService.getCourses();
    this.coursesSub = this.courseService.getCoursesUpdateListner().subscribe(data=>{
      this.courses = data;
      console.log(this.courses);
    });

  }

  deleteCourse(id : string){
    this.courseService.deleteCourse(id);
    
  }


}
