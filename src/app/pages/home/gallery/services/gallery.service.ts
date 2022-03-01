import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, retryWhen, take } from 'rxjs';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { environment } from 'src/environments/environment';
import { Gallery } from '../../models/gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private API_URL = environment.URL;


  constructor(private http: HttpClient, private httpUtil: HttpUtilService) { }

  getGallery(page: number, qtd: number) {
    return this.http.get(this.API_URL + `gallery/${page}/${qtd}`)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  createNews(gallery: Gallery) {
    gallery.status = Number(gallery.status);
    return this.http.post(this.API_URL + `gallery`, gallery)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  updateGallery(gallery: Gallery) {
    return this.http.put(this.API_URL + `gallery/${gallery.id}`, gallery)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }

  deleteGallery(id: string) {
    return this.http.delete(this.API_URL + 'gallery/' + id)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(3))),
        catchError(this.httpUtil.processarErros));
  }

  getGalleryById(id: string) {
    return this.http.get(this.API_URL + 'gallery/' + id)
      .pipe(map(this.httpUtil.extrairDados))
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processarErros));
  }
}
