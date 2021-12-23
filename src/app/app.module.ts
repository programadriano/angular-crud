import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertService } from './shared/services/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './pages/home/home.module';
import { UploadService } from './shared/services/upload.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers:[
    AlertService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
