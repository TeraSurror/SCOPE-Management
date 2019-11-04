import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token : string;
  private isAuth : boolean = false;
  private isAdmin : boolean = false;
  private adminStatusListener = new Subject<boolean>();
  private authStatusListener = new Subject<boolean>();
  private name :string;
  constructor(private http: HttpClient,private router : Router) {

  }

  getUserName(){
    return this.name;
  }


  getIsAdmin(){
    return this.isAdmin;
  }

  getIsAuth(){
    return this.isAuth;
  }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getAdminStatusListener(){
    return this.adminStatusListener.asObservable();
  }
  
  createUser(name: string, email: string, password: string) {

    const authData: AuthData = {
      name: name,
      email: email,
      password: password
    }

    

    this.http.post("http://localhost:3000/users/register", authData).subscribe(response =>{
      console.log(response);      
      this.router.navigate(['/login']);      
    });
  }

  login(email: string, password: string) {

    const authData: AuthData = {
      email: email,
      password: password
    }   

    this.http.post<{token:string,isAdmin : boolean,name:string}>("http://localhost:3000/users/login", authData).subscribe(response =>{
      const token = response.token;
      this.token = token;
      this.isAdmin = response.isAdmin;    
      
      if(token){
        this.name = response.name;
        console.log(this.name);  
        this.authStatusListener.next(true);
        this.isAuth = true;       
        if(this.isAdmin){
          console.log(this.isAdmin);
          this.isAdmin = true;
          this.adminStatusListener.next(true);
        } 
        else{
          console.log(this.isAdmin);
          this.isAdmin = false;
          this.adminStatusListener.next(false);
        }
        this.router.navigate(['/']);
      }
    });
  }

  logout(){
    this.token = null;
    this.authStatusListener.next(false);
    this.adminStatusListener.next(false);
    this.isAdmin = false;
    this.isAuth = false;
    this.router.navigate(['/']);
  }

}
