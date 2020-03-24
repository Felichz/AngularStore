import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError: any;
  waiting = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    this.waiting = true;
    
    if (this.registerForm.valid) {
      this.authService.createUser(value.email, value.password)
        .then(response => {
          this.router.navigate(['/admin']);
          this.waiting = false;
        })
        .catch(error => {
          this.registerError = error;
          this.waiting = false;
        });
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
