import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DemoComponent } from './components/demo.component';

import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ DemoComponent ],
  imports: [
    FormsModule,
    CommonModule,
    DemoRoutingModule,
    SharedModule
  ]
})
export class DemoModule { }
