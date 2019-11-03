import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { FormBuilder,FormGroup,FormArray } from '@angular/forms';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  constructor(private courseService : CoursesService,private fb : FormBuilder) { }

  addCourseForm : FormGroup;

  ngOnInit() {
    this.addCourseForm = this.fb.group({
      title : '',
      author : '',
      skills : this.fb.array([]),
    });
  }

  get skillForms() {
    return this.addCourseForm.get('skills') as FormArray
  }
  
  addModule() {
  
    const skill = this.fb.group({ 
      title : []
    })
  
    this.skillForms.push(skill);
  }
  
  deleteSkill(i) {
    this.skillForms.removeAt(i)
  }

  addCourse(){
    const courseData = this.addCourseForm.value;
    const modules : string[] = [];

    for(let skill of courseData.skills){
      modules.push(skill.title);
    }


    this.courseService.addCourse(courseData.title,courseData.author,modules);
  }

}
