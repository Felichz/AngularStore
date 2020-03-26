import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RegisterRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RegisterModule { }
