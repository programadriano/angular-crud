import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewsComponent } from './news/news.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'videos', component: VideoComponent },
  { path: 'noticias', component: NewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
