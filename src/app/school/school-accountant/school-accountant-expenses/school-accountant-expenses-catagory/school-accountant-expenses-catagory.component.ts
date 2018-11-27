import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {ExpensesService} from '../../../../shared/services/expenses.service';

const ls = localStorage;

@Component({
	selector: 'app-school-accountant-expenses-catagory',
	templateUrl: './school-accountant-expenses-catagory.component.html',
	styleUrls: ['./school-accountant-expenses-catagory.component.scss']
})
export class SchoolAccountantExpensesCatagoryComponent implements OnInit {
	staffData = {
		_id: '',
	}
	schoolData = {
		_id: '',	
	}
	userData = JSON.parse(ls.getItem('userData'));
	nameToDelete = '';
	nameToEdit = '';
	expenseCategoryData = {
		name:'',
		comment:'',
		createdById:'',
		schoolId:'',
	};
	toShowData = [];
	searchString : string;
	initialData : string;
	showAdd = false ; 
	constructor(private school: SchoolService,
		private staff: StaffService,
		private router: Router,
		private modalService: NgbModal,
		private alert: ToastrService,
		private expenses: ExpensesService) { }

	ngOnInit() {
		this.userData = JSON.parse(ls.getItem('userData'));
		this.staff.getStaffByLoginId(this.userData._id.toString())
		.map(x => x.json())
		.subscribe(res => {
			console.log('staffres', res);
			if (res && res.data && res.data._id) {
				this.staffData = res.data;
				this.expenseCategoryData.createdById = res.data._id;
				if (res.data.schoolId) {
					this.expenseCategoryData.schoolId = res.data.schoolId;
					console.log('expenseCategoryData', this.expenseCategoryData);
					this.school.getSchoolById(res.data.schoolId)
					.map(x => x.json())
					.subscribe(scRes => {
						console.log('scRes', scRes);
						if (scRes.success) {
							this.schoolData = scRes.data;
							this.getCategory();
							this.showFirst();
						}
						else {
							this.alert.error('Not able to fetch school information!', 'Reload Page');
						}
					})
				}

			} else {
				this.alert.error('Not able to fetch staff information!', 'Reload Page');
			}
		})
	}

	showFirst(){
		if(this.toShowData.length === 0){
			this.showAdd = true;
		}else{
			this.showAdd = false;
		}
	}
	submitExpenseCategory() {
		console.log('expenseCategoryData', this.expenseCategoryData)
		if (!this.expenseCategoryData.createdById ||
			!this.expenseCategoryData.schoolId ||
			!this.expenseCategoryData.name
			) {
			this.alert.error('Data Incomplete please reload', 'Error');
		return;
	}
	this.expenses.saveExpensesCategory(this.expenseCategoryData)
	.map(x => x.json())
	.subscribe(res => {
		console.log('res', res);
		this.alert.success(res.message, 'Success');
		this.expenseCategoryData.name = '';
		this.expenseCategoryData.comment = '';
		this.showAdd = false ;
		this.getCategory();
		console.log('save works', this.expenseCategoryData);
	});
}

search(e) {
	console.log('e', e);
	if (e) {
		const pattern = new RegExp(e, 'i');
		this.toShowData = this.toShowData.filter(val => {
			return pattern.test(val.name);
		});
		if (!this.toShowData.length) {
			this.toShowData = JSON.parse(this.initialData);
		}
	} else {
		this.toShowData = JSON.parse(this.initialData);
	}
}

editExpenseCategory(expenseCategory , index, content){
	this.nameToEdit = expenseCategory.name;
	this.expenses.getExpensesCategoryById(expenseCategory._id)
	.map(x=>x.json())
	.subscribe(res=>{
		if(res && res.data)
			console.log('transport info',res.data);
		this.expenseCategoryData = res.data ;
	})
	console.log('index',index);

	this.modalService.open(content)
	.result.then((result) => {
		if (result === 'yess') {
			this.expenses.editExpensesCategory(this.expenseCategoryData)
			.map(x=>x.json())
			.subscribe(res=>{
				console.log('res', res);
				this.alert.success(res.message, 'Success');
				this.getCategory();
			})

		} else if (result === 'cancels') {
			this.alert.info(expenseCategory.name + ' not edited !', 'Information!');
		} else {
			this.alert.error(expenseCategory.name + ' not edited !', 'Error!');
		}
	}, (reason) => {
		this.alert.info(expenseCategory.name + ` not edited  due to ${this.getDismissReason(reason)}`, 'Information!');
	});
}

delete(expenseCategory, index, content1) {
	this.nameToDelete = expenseCategory.name;
	this.modalService.open(content1)
	.result.then((result) => {
		if (result === 'yes') {
			this.expenses.deleteExpensesCategory(expenseCategory._id)
			.map(x => x.json())
			.subscribe(res => {
				console.log('res', res);
				if (res.success) {
					this.toShowData.splice(index, 1);
					this.alert.success(expenseCategory.name + ' deleted successfully!', 'Success!');
				} else {
					this.alert.error('Something went wrong!', 'Error!!');
				}
			});
		} else if (result === 'cancel') {
			this.alert.info(expenseCategory.name + ' not deleted!', 'Information!');
		} else {
			this.alert.error(expenseCategory.name + ' not deleted!', 'Error!');
		}
	}, (reason) => {
		this.alert.info(expenseCategory.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
	});
}

private getDismissReason(reason: any): string {
	if (reason === ModalDismissReasons.ESC) {
		return 'pressing ESC';
	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		return 'clicking on a background!';
	} else {
		return `${reason}`;
	}
}
getCategory(){
	console.log('category view school id',this.schoolData._id)
	this.expenses.getExpensesCategoryBySchoolId(this.schoolData._id)
	.map(x => x.json())
	.subscribe(expensesCategoryRes => {
		console.log('expensesCategoryRes', expensesCategoryRes);
		if (expensesCategoryRes.success) {
			this.toShowData = expensesCategoryRes.data;
			this.initialData = JSON.stringify(expensesCategoryRes.data);
		}
	})
}
addNew(){
	this.showAdd = true ;
}

}
