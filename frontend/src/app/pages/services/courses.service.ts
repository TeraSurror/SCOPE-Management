import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: any = [];
  private coursesUpdated = new Subject();

  private enrolledCourses: any = [];
  private enrolledCoursesUpdated = new Subject();

  constructor(private http: HttpClient) { }

  getEnrollCourses(){
    return this.enrolledCourses;
  }

  enrollCourse(title: string, author: string, skills: string[]){
    const course = {
      title: title,
      author: author,
      skills: skills
    };

    this.enrolledCourses.push(course);
    this.enrolledCoursesUpdated.next([...this.enrolledCourses]);
    console.log(this.enrolledCourses);
  }

  getCourses() {
    this.http.get('http://localhost:3000/courses')
      .subscribe((data) => {
        this.courses = data;
        this.coursesUpdated.next([...this.courses]);
      });
  }

  addCourse(title: string, author: string, skills: string[]) {
    const course = {
      title: title,
      author: author,
      skills: skills
    };

    this.http.post('http://localhost:3000/courses', course)
      .subscribe(data => {
        console.log(data);

        this.courses.push(course);
        this.coursesUpdated.next([...this.courses]);
      });
  }

  deleteCourse(id : string){
    this.http.delete('http://localhost:3000/courses/'+id)
    .subscribe(data=>{
      const updatedCourses = this.courses.filter(course => course.id !== id);
      this.courses = updatedCourses;
      this.coursesUpdated.next([...this.courses]);
    });
  }

  getCoursesUpdateListner() {
    return this.coursesUpdated;
  }

  getEnrolledCourses(){
    return this.enrolledCoursesUpdated;
  }
}
