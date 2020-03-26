import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent
    ],
    imports: [
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
