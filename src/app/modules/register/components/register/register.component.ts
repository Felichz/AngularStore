import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder ) {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  ngOnInit() {
  }

  submitForm( value ) {
    console.log(value);
  }

  get nameField() {
    return this.registerForm.get('name');
  }

  get passwordField() {
    return this.registerForm.get('password');
  }

  get emailField() {
    return this.registerForm.get('email');
  }
}
