import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLogin(form: NgForm){
    console.log(form);
    this.authService.login(form.value).subscribe(resData => {
      console.log('prijava uspela');
      console.log(resData);
      this.router.navigateByUrl('/pickups');
    });
  }

}
