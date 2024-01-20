import { Injectable } from '@angular/core';
import { parseISO, format, parse, formatISO } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }

  fromISO(dateStr: string): Date {
    return parseISO(dateStr)
  }

  fromStandard(dateStr: string): Date {
    return parse(dateStr, 'MMMM dd, yyyy', new Date());
  }

  formatDateStandard(date: Date): string {
    return format(date, 'MMMM dd, yyyy')
  }

  formatDateISO(date: Date): string {
    return formatISO(date)
  }
}
