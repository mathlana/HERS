import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup( {
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      address: new FormControl(null),
      addressNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      zip: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      city: new FormControl(null),
      state: new FormControl(null)
    });
  }

  onRegister(){
    this.loadingController.create({message: "Registering user..."}).then((loadingEl:HTMLIonLoadingElement) => {
        loadingEl.present();
        this.authService.register(this.registerForm.value).subscribe(resData => {
                                                                                    loadingEl.dismiss();
                                                                                    this.router.navigateByUrl('/pickups'); });
    })
  }


}
