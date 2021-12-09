import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { map, catchError, retryWhen, delay, take } from 'rxjs/operators';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_URL = environment.URL;


  constructor(private http: HttpClient, private httpUtil: HttpUtilService) { }

  getNews() {
    return this.http.get(this.API_URL + 'news')
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  createNews(news: News) {
    news.status = Number(news.status);
    return this.http.post(this.API_URL + `news`, news)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  updateNews(news: News) {
    return this.http.put(this.API_URL + `news/${news.id}`, news)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  deleteNews(id: string) {
    return this.http.delete(this.API_URL + 'news/' + id)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(3))),
        catchError(this.httpUtil.processarErros));
  }

  getNewsById(id: string) {
    return this.http.get(this.API_URL + 'news/' + id)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }
}
