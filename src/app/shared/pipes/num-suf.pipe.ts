import {Pipe, PipeTransform} from '@angular/core';

const suffixes = ['th', 'st', 'nd', 'rd'];

@Pipe({
  name: 'numSuf'
})
export class NumSufPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (!value) {
      return value;
    }
    const relevantDigits = (value < 30) ? value % 20 : value % 30;
    return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
  }

}
