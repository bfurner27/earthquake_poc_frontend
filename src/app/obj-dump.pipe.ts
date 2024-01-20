import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objDump',
  standalone: true
})
export class ObjDumpPipe implements PipeTransform {

  transform(value: object, ...args: unknown[]): string {
    return JSON.stringify(value);
  }

}
