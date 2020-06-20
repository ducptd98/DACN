import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loopNumber'
})
export class LoopNumberPipe implements PipeTransform {

  transform(value, args: string[]): any {
    const res = [];
    for (let i = 1; i <= value; i++) {
      res.push(i);
    }
    return res;
  }

}
