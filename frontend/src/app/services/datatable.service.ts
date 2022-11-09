import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from 'src/models/workout';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private baseURL = window.location.protocol + "//" + window.location.host 
  private API_subroute = "/api"

  private getDataUrl = "/datatableData"
  private getDataBySearchUrl = "/datatableDataSearch"

  constructor(private http: HttpClient) { }

  getAllData(): Observable<HttpResponse<Workout[]>> {
    return this.http.get<Workout[]>(this.baseURL + this.API_subroute + this.getDataUrl, { observe: 'response' })
  }

  getSearchData(field: string, value: string): Observable<HttpResponse<Workout[]>> {
    return this.http.get<Workout[]>(this.baseURL + this.API_subroute + this.getDataBySearchUrl, 
      { observe: 'response', params: { field: field, value: value } })
  }
}
