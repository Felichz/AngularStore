import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

// Components
import { ProductComponent } from './components/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Pipes
import { PowPipe } from './pipes/pow/pow.pipe';
import { SqrtPipe } from './pipes/sqrt/sqrt.pipe';

// Directives
import { HighlightDirective } from './directives/highlight/highlight.directive';

@NgModule({
  declarations: [
    // Components
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    // Pipes
    PowPipe,
    SqrtPipe,
    // Directives
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    // Modules
    CommonModule,
    MaterialModule,
    // Components
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    // Pipes
    PowPipe,
    SqrtPipe,
    // Directives
    HighlightDirective,
  ]
})
export class SharedModule { }
