import { Pipe, PipeTransform, inject } from '@angular/core';
import { DateFormatterService } from './date-formatter.service';

@Pipe({
  name: 'isoToStandard',
  standalone: true
})
export class IsoToStandardPipe implements PipeTransform {
  constructor() { }
  private dateFormatterService: DateFormatterService = inject(DateFormatterService);

  transform(dateStr: string): string {
    const date = this.dateFormatterService.fromISO(dateStr)
    return this.dateFormatterService.formatDateStandard(date)
  }

}
