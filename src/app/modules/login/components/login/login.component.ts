import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor( private formBuilder: FormBuilder ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  ngOnInit() {
  }

  submitForm( value ) {
    console.log(value);
  }

  get passwordField() {
    return this.loginForm.get('password');
  }

  get emailField() {
    return this.loginForm.get('email');
  }
}
