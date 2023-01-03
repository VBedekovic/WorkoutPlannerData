import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = window.location.protocol + "//" + window.location.host 
  private checkIfAuthURL = "/checkauth"
  private profileDataURL = "/user/profile"
  private refresURL = "/user/refresh"


  constructor(private http: HttpClient) { }

  checkAuth(): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(this.baseURL + this.checkIfAuthURL, { observe: 'response' })
  }

  getUserData(): Observable<HttpResponse<
    {
      nickname: string,
      name: string,
      picture: string,
      updated_at: string,
      email: string,
      email_verified: boolean,
      sub: string,
      sid: string
    }
  >> {
    return this.http.get<{
      nickname: string,
      name: string,
      picture: string,
      updated_at: string,
      email: string,
      email_verified: boolean,
      sub: string,
      sid: string
    }>(this.baseURL + this.profileDataURL, { observe: 'response' })
  }

  refreshFiles(): Observable<HttpResponse<null>> {
    return this.http.get<null>(this.baseURL + this.refresURL, { observe: 'response' })
  }
}
