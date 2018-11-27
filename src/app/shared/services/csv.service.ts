import {Injectable} from '@angular/core';

@Injectable()
export class CsvService {

  constructor() {
  }

  convertToCSV(targetObj: any) {
    const array = typeof targetObj !== 'object' ? JSON.parse(targetObj) : targetObj;

    let str = '';
    let row = '';

    for (const i in targetObj[0]) {
      // Now convert each value to string and comma-separated
      row += i + ',';
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') {
          line += ',';
        }
        line += JSON.stringify(array[i][index]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  download(data: any, fileName: string) {
    const csvData = this.convertToCSV(data);

    const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});

    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, fileName + '.csv')
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

  }
}
