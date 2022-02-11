import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { map, catchError, retryWhen, delay, take } from 'rxjs/operators';
import { Video } from '../../models/video';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private API_URL = environment.URL;

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) { }

  getVideos(page: number, qtd: number) {
    return this.http.get(this.API_URL + `videos/${page}/${qtd}`)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  createVideo(video: Video) {
    video.status = Number(video.status);
    return this.http.post(this.API_URL + `videos`, video)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  updateVideo(video: Video) {
    return this.http.put(this.API_URL + `videos/${video.id}`, video)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  deleteVideo(id: string) {
    return this.http.delete(this.API_URL + 'videos/' + id)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(3))),
        catchError(this.httpUtil.processarErros));
  }

  getVideoById(id: string) {
    return this.http.get(this.API_URL + 'videos/' + id)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }
}
