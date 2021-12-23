import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './services/home.service';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    CKEditorModule
  ],
  providers: [
    HomeService
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
