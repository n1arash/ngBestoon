import { AccountService } from './../account.service';
import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from "../home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService, AccountService]

})
export class HomeComponent implements OnInit {
  states: string;
  incomes;
  expenses;
  message = '';
  token = localStorage.getItem('token');
  getToken;
  show;
  hinge = false;

  constructor(private homeService: HomeService, private accountService: AccountService) {
}
  ngOnInit() {
    if (this.token) {
      this.getState(this.token)
    } else {
      return;
    }
  }
  setMessage(message: string) {
    this.message = message;
    return false;
  }
  get getMessage() {
    return this.message
  }

  submitIncome(token, amount: number, text: string) {
    token = localStorage.getItem('token');
    if (token !== null) {
      this.homeService.submitIncome(token, amount, text)
        .subscribe(income => {
          this.setMessage("دخل ثبت شد");
          this.incomes = income;
          this.getState(token);
        });
    }
  }

  submitExpense(token, amount: number, text: string) {
    token = localStorage.getItem('token');
    if (token !== null) {
      this.homeService.submitExpense(token, amount, text)
        .subscribe(expense => {
          this.setMessage("خرج ثبت شد");
          this.expenses = expense;
          this.getState(token);
        });
    }
  }

  getState(token) {
    token = localStorage.getItem('token')
    this.homeService.getStates(token)
      .subscribe(state => {
        console.log("STATES " + state)
        return this.states = state
      });

  }

  login(username: string, password: string) {

    this.accountService.login(username, password)
      .subscribe(token => {
        this.getToken = token;
        console.log(token);
        if (token.result === "ok") {
          localStorage.setItem('token', token.token);
          this.setMessage("شما با موفقیت وارد شدید ");
          this.hinge = true;
          setInterval(()=>{
            this.show = "none"
            this.getState(token.token)
          },2000);
          return true;
        }
        this.setMessage("ورود با موفقیت انجام نشد نام کاربری و رمز عبور خود را چک  کنید")
        this.show = "block";
        return false;
      });
  }
}
