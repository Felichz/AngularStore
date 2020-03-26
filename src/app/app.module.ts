import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireStorageModule } from '@angular/fire/storage';
import 'firebase/storage';
import { environment } from 'src/environments/environment';


@NgModule({
  // Components, Pipes, Directives
  declarations: [
    AppComponent
  ],
  // Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  exports: [
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
