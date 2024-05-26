import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/'

export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  registerClient(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "client/sign-up", signupRequestDTO);
  }

  registerCompany(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "company/sign-up", signupRequestDTO);
  }

  // Login API call
  login(userName: string, password: string) {
    return this.http.post(BASIC_URL + "authenticate", { userName, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          console.log(res.body)
          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength); //we don't want to get the "Bearer " string
          console.log(bearerToken);
          return res;
        }))
  }
}
