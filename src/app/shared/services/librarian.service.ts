import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

const librarianUrl = '/api/library/';

@Injectable()
export class LibrarianService {

  constructor(public http: Http) {
  }

  saveBook(data) {
    return this.http.post(librarianUrl + 'addBook', data);
  }

  editBook(data) {
    return this.http.post(librarianUrl + 'edit', data);
  }

  deleteBook(id) {
    return this.http.post(librarianUrl + 'deleteBook/' + id, {});
  }

  issueBook(data) {
    return this.http.post(librarianUrl + 'issueBook', data);
  }

  returnBook(data) {
    return this.http.post(librarianUrl + 'returnBook', data);
  }

  getBooksBySchoolId(sId) {
    return this.http.get(librarianUrl + 'getBySchoolId/' + sId);
  }

  getBookById(bId) {
    return this.http.get(librarianUrl + 'getBookById/' + bId);
  }

  getIssueBooksBySchoolId(sId) {
    return this.http.get(librarianUrl + 'getIssueBookBySchoolId/' + sId);
  }
  getBookCount(schoolId) {
    return this.http.get(librarianUrl + 'getBooksCount/' + schoolId);
  }
  getIssueBookCount(schoolId) {
    return this.http.get(librarianUrl + 'getIssueBooksCount/' + schoolId);
  }
  getReturnBookCount(schoolId) {
    return this.http.get(librarianUrl + 'getReturnBooksCount/' + schoolId);
  }
}
