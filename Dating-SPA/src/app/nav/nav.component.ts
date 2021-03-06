import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public auth: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.auth.login(this.model).subscribe(
      (next) => {
        this.alertify.success('logged in successfully');
        this.router.navigate(['/members']);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn() {
    return this.auth.isLoggedIn();
  }

  logOut() {
    this.auth.logOut();
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
