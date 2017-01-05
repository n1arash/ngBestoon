import {Component, OnInit, Input} from '@angular/core';
import {HomeService} from "../home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]

})
export class HomeComponent implements OnInit {
  states: string;
  status: number;
  incomes;
  expenses;
  message;
  token = localStorage.getItem('token');

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.getState(token)
    }
  }

  submitIncome(token, amount: number, text: string) {
    token = localStorage.getItem('token');
    if (token !== null) {

      this.homeService.submitIncome(token, amount, text)
        .subscribe(income => {
          this.message = `دخل ثبت شد`;
          return this.incomes = income;
        });
    }
  }

  submitExpense(token, amount: number, text: string) {
    token = localStorage.getItem('token');
    if (token !== null) {
      this.homeService.submitExpense(token, amount, text)
        .subscribe(expense => {
          this.message = `خرج ثبت شد`;
          return this.expenses = expense;
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

  private checkToken(token) {
    if (this.status === 200) {
      localStorage.setItem('token', token)
      this.message = `توکن شما با موفقیت ثبت شد`
      this.getState(token)
      console.log("ToKEN: " + this.status)
      return true;
    }
    if (this.status === 500) {
      this.message = `
توکن دارای مشکل است لطفا توکن خود را چک کنید      
`;
      return false;
    }
  }

  setToken(token) {
    let tok = localStorage.getItem('token')
    if (tok === null) {
      this.homeService.setToken(token)
        .subscribe(status => {
          console.log(status)
          return this.status = status
        });
      this.checkToken(token);
    } else {
      this.message = `توکن قبلا ثبت شده است ! `
      return true;
    }
  }

}
