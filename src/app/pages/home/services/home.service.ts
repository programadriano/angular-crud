import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { shareReplay, map, catchError, retry, retryWhen, delay, take } from 'rxjs/operators';

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


  getNewsById(id: string) {
    return this.http.get(this.API_URL + 'news/' + id)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
         retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }
}
