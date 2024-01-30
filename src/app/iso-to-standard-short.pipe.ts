import { Pipe, PipeTransform, inject } from '@angular/core';
import { DateFormatterService } from './date-formatter.service';

@Pipe({
  name: 'isoToStandardShort',
  standalone: true
})
export class IsoToStandardShortPipe implements PipeTransform {
  constructor() { }
  private dateFormatterService: DateFormatterService = inject(DateFormatterService);

  transform(dateStr: string): string {
    const date = this.dateFormatterService.fromISO(dateStr)
    return this.dateFormatterService.formatDateStandardShort(date)
  }

}
