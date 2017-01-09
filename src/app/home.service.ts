import { Injectable } from '@angular/core';
import {Http,Headers,Response,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs";
@Injectable()
export class HomeService {
  private URL:string;
  private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) { }

  getStates(token){
        let body = `token=${token}`;
        this.URL = "http://bestoon.ir/q/generalstat/";
        return this.http.post(`${this.URL}`,body,this.options)
            .map((res: Response) => res.json());
  }

  submitIncome(token,amount:number,text:string):Observable<any>{
    let body = `token=${token}&amount=${amount}&text=${text}`
    this.URL = "http://bestoon.ir/submit/income/"
    return this.http.post(this.URL,body,this.options)
      .map(res => res.json());
  }
  submitExpense(token,amount:number,text:string):Observable<any>{
    let body = `token=${token}&amount=${amount}&text=${text}`
    this.URL = "http://bestoon.ir/submit/expense/"
    return this.http.post(this.URL,body,this.options)
      .map(res => res.json());
  }

}
