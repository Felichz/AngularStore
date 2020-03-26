import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';

import { SharedModule } from '../shared/shared.module';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [ LayoutComponent ],
  imports: [
    LayoutRoutingModule,
    SharedModule,
    AngularFireStorageModule
  ],
  exports: [
    AngularFireStorageModule
  ]
})
export class LayoutModule { }
