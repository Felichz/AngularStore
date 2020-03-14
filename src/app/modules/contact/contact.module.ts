import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './components/contact.component';

import { ContactRoutingModule } from './contact-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ ContactComponent ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ContactModule { }
