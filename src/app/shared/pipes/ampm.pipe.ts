import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ampm'
})
export class AmpmPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('value', value);
    console.log('!value', !value);
    if (!value || !value.hasOwnProperty('hour') || !value.hasOwnProperty('minute')) {
      return value;
    }
    value.hour = parseInt(value.hour, 10);
    value.minute = parseInt(value.minute, 10);
    const ampm = value.hour >= 12 ? 'PM' : 'AM';
    value.hour = value.hour % 12;
    value.hour = value.hour ? value.hour : 12;
    // the hour '0' should be '12'
    value.minute = value.minute < 10 ? '0' + value.minute : value.minute;
    return value.hour + ':' + value.minute + ' ' + ampm;
  }

}
