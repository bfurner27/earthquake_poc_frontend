import { ToIsoDatePipe } from './to-iso-date.pipe';

describe('ToIsoDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ToIsoDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('verify that full iso date time is parsed to just the date', () => {
    const pipe = new ToIsoDatePipe();
    expect(pipe.transform('2023-10-14T12:23:16Z')).toEqual('2023-10-14');
  })
});
