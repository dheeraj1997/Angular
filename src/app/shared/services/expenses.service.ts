import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

const expensesUrl = '/api/expenses/';

@Injectable()
export class ExpensesService {

	constructor(public http: Http) { }

	saveExpenses(data) {
		return this.http.post(expensesUrl + 'addExpenses', data);
	}
	getExpensesBySchoolId(sId){
		return this.http.get(expensesUrl + 'getBySchoolId/' + sId);
	}
	deleteExpenses(id) {
		return this.http.post(expensesUrl + 'deleteExpenses/' + id, {});
	}  
	getExpensesById(eId) {
		return this.http.get(expensesUrl  + eId);
	}
	editExpenses(data) {
		return this.http.post(expensesUrl + 'editExpense', data);
	}
	getTotalExpenses(sId){
		return this.http.get(expensesUrl + 'getTotalExpense/' + sId);
	}

	// expense category
	saveExpensesCategory(data){
		return this.http.post(expensesUrl +'addExpensesCategory' , data);
	}
	getExpensesCategoryBySchoolId(sId){
		return this.http.get(expensesUrl + 'getCategoryBySchoolId/' + sId);
	}
	deleteExpensesCategory(id) {
		return this.http.post(expensesUrl + 'deleteExpensesCategory/' + id, {});
	}  
	getExpensesCategoryById(eCId) {
		return this.http.get(expensesUrl +'expenseCategory/' + eCId);
	}
	editExpensesCategory(data) {
		return this.http.post(expensesUrl + 'editExpenseCategory', data);
	}

	
}
