import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guard/authGuard.service';
import { HomeComponent } from './home.component';
import { NewsComponent } from './news/news.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuardService]
  },
  { path: 'videos', component: VideoComponent, canActivate: [AuthGuardService] },
  { path: 'noticias', component: NewsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
