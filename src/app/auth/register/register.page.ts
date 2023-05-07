import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup( {
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      phoneNumber: new FormControl(null),
      Address: new FormControl(null),
      address: new FormControl(null),
      number: new FormControl(null),
      neighborhood: new FormControl(null),
      complement: new FormControl(null),
      zip: new FormControl(null),
      state: new FormControl(null),
      city: new FormControl(null)
    });
  }

  onRegister(){
    console.log(this.registerForm);
  }
}
