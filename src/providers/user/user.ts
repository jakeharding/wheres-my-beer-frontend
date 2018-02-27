import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Env from "../../env";
import PageResponse from "../../models/PageResponse";
import User from "../../models/User";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  url: string;

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}users`;
  }

  create(userData: any) {
    return this.http.post(this.url, userData).toPromise();
  }

  retrieve() {
    return this.http.get(this.url).toPromise().then(({ results }: PageResponse<User>) => {
      return results[0];
    });
  }
}