import { Injectable } from '@angular/core';
import { parseISO, parse, format } from 'date-fns';

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

  formatDateStandardShort(date: Date): string {
    return format(date, 'MMM dd, yyyy')
  }

  formatDateISO(date: Date): string {
    // setting the hours to the end of the day so when it tries to convert it it remains the same day
    return format(date.setHours(23, 59, 59), 'yyyy-MM-dd');
  }
}
