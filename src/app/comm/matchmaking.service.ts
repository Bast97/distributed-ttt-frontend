import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchResult } from './beans';

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  constructor(private http: HttpClient) { }

  getMatch(url: string): Observable<MatchResult> {
    return this.http.get<MatchResult>(url);
  }
}
