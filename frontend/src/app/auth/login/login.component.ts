import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm : FormGroup;

  constructor(public authService : AuthService,private fb : FormBuilder) { }  

  ngOnInit() {
    this.loginForm = this.fb.group({
      email : '',
      password : ''
    })
  }

  onLogin(){
    const loginFormValue = this.loginForm.value;
    this.authService.login(loginFormValue.email,loginFormValue.password);
  }

}

/* "harshshelar22@gmail.com" "1234567" */