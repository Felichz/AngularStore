import { NgModule } from '@angular/core';

import { ContactComponent } from './components/contact.component';

import { ContactRoutingModule } from './contact-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ ContactComponent ],
  imports: [
    ContactRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ContactModule { }
