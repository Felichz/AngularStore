import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class LoginModule { }
