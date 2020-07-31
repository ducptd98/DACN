import {Pipe, PipeTransform} from '@angular/core';
import {formatDistance} from 'date-fns';
import viLocale from 'date-fns/locale/vi';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return null;
    }
    // 2020-07-18 13:24:04
    const temp = value.split(' ');

    const date = temp.join('T');

    const dateFrom = new Date(date);

    return formatDistance(dateFrom, new Date(), {
      addSuffix: true, locale: viLocale
    });
  }

}
