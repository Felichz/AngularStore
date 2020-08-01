import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
    declarations: [
        ProductFormComponent,
        NavComponent,
        DashboardComponent,
        ProductListComponent,
        ProductEditComponent,
    ],
    imports: [AdminRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AdminModule {}
