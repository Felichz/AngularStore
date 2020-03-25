import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  loginErrorMessage: string;
  invalidFormSubmit = false;
  waiting = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  ngOnInit() {
  }

  submitForm( value ) {

    if (this.loginForm.valid) {

      this.waiting = true;

      this.authService.login(value.email, value.password)
      .then(result => {
        this.waiting = false;
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        this.waiting = false;
        this.loginError = error.code;
        this.loginErrorMessage = error.message;
      });

    } else {
      this.invalidFormSubmit = true;
    }
  }

  get passwordField() {
    return this.loginForm.get('password');
  }

  get emailField() {
    return this.loginForm.get('email');
  }
}
