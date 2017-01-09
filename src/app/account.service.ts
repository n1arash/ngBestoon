import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
  private URL:string;
  private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) { }

  login(username:string,password:string){
    let body = `username=${username}&password=${password}`;
    this.URL = "http://bestoon.ir/accounts/login";
    return this.http.post(`${this.URL}`,body,this.options)
        .map((res: Response) => res.json());
  }
  
}
