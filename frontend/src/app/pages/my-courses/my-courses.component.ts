import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  courses:any = [];
  private coursesSub: Subscription;
  constructor(private courseService : CoursesService) { }

  ngOnInit() {
    this.courseService.getEnrolledCourses();
    this.courses = this.courseService.getEnrollCourses();
  }

}
