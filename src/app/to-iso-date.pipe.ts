import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toIsoDate',
  standalone: true
})
export class ToIsoDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.substring(0, 10);
  }

}
