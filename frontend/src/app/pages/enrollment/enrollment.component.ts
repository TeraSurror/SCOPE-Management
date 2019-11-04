import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  private courses: any = []
  private coursesSub: Subscription;
  constructor(private courseService: CoursesService, private authService: AuthService) { }

  ngOnInit() {
    this.courseService.getCourses();
    this.coursesSub = this.courseService.getCoursesUpdateListner().subscribe(data => {
      this.courses = data;
    });
  }

}
