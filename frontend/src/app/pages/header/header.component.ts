import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  userIsAuthenticated : boolean  = false;
  private authListenerSub : Subscription;
  userIsAdmin : boolean = false;
  private adminListenerSub : Subscription;
  constructor(private authService : AuthService) {
    
  }

  ngOnInit() {
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });
    this.adminListenerSub = this.authService.getAdminStatusListener().subscribe(isAdmin=>{
      this.userIsAdmin = isAdmin;
    });
  }

  ngOnDestroy(){
    this.authListenerSub.unsubscribe();
    this.adminListenerSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }


}
