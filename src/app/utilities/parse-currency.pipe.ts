import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseCurrency'
})
export class ParseCurrencyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const temp = value.split(' ');
    let curr = '';
    let thoathuan = false;
    switch (temp[1]) {
      case 't':
        curr = 'Tỷ';
        break;
      case 'triu':
        curr = 'Triệu';
        break;
      case 'thun':
        curr = 'Thỏa thuận';
        thoathuan = true;
        break;
      default:
        curr = 'Triệu/m';
        break;
    }
    return !thoathuan ? `${temp[0]} ${curr}` : curr;
  }

}
