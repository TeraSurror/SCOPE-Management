import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;

  constructor(public authService : AuthService,private fb : FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name : '',
      email : '',
      password : '',
    })
  }

  onSignUp(){
    const signupFormValue = this.signupForm.value
    this.authService.createUser(signupFormValue.name,signupFormValue.email,signupFormValue.password);
  }
}
