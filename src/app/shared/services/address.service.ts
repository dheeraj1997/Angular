import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


const pinUrl = '/api/external/getPinInfo/';

@Injectable()
export class AddressService {

  constructor(public http: Http) {
  }

  getAddressByPin(pin) {
    return this.http.get(pinUrl + pin);
  }
}

