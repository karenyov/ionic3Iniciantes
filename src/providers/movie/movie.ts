import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/platform/platform';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath = "/api";

  constructor(public http: HttpClient, private _platform: Platform) {
    if (this._platform.is("cordova")) {
      this.baseApiPath = "https://api.themoviedb.org/3";;
    }
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1) {
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.getApiKey());
  }

  getMoviesDetails(filmeId) {
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=` + this.getApiKey());
  }

  getApiKey(): string {
    return "8836d045e5ea09ce5af4c46e8207aa3e";
  }

}
