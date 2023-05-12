import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;

  constructor( private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  onLogin(form: NgForm){

    this.isLoading = true;

    console.log(form);
    this.authService.login(form.value).subscribe(resData => {
      console.log('prijava uspela');
      console.log(resData);
      this.isLoading = false;
      this.router.navigateByUrl('/pickups');
    },
    errRes => {
      console.log(errRes);
      this.isLoading = false;
      let message = "Incorrect email or password";
      const ErrorMessage = errRes.error.error.message;

      if (ErrorMessage === 'EMAIL_NOT_FOUND') {
        message = 'Email address could not be found.';
      } else if (ErrorMessage === 'INVALID_PASSWORD') {
        message = 'This password is not correct.';
      }
      
      this.alertCtrl.create({
        header: "Authentication failed",
        message: message,
        buttons:['Okay']
      }).then((alert:HTMLIonAlertElement) => {
        alert.present();
      });

      form.reset();
    });
  }

}
