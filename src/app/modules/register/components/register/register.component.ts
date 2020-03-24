import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError: any;
  invalidFormSubmit = false;
  waiting = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  ngOnInit() {
  }

  submitForm( value ) {

    if (this.registerForm.valid) {

      this.waiting = true;

      this.authService.createUser(value.email, value.password)
        .then(response => {
          this.waiting = false;

          Swal.fire({
            icon: 'success',
            title: 'Account created successfully'
          })
          .then(() => {
            this.router.navigate(['/admin']);
          });
        })
        .catch(error => {
          this.waiting = false;
          this.registerError = error.message;
        });

    } else {
      this.invalidFormSubmit = true;
    }
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
