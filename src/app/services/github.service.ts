import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { GitHub } from '../services/models/github-model';



@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  public getUser(userName: string): Observable<GitHub> {
    const url ='https://api.github.com/users/' + userName;
    return this.http.get<GitHub>(url);
  }

  public getInfo(): Observable<GitHub> {
    const url ='https://api.github.com/users/';
    return this.http.get<GitHub>(url);
  }

}
