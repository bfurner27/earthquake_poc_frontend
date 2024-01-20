import { IsoToStandardPipe } from './iso-to-standard.pipe';

describe('IsoToStandardPipe', () => {
  it('create an instance', () => {
    const pipe = new IsoToStandardPipe();
    expect(pipe).toBeTruthy();
  });

  it('verfiy that formatting takes existing iso string and converts it into standard str', () => {
    const pipe = new IsoToStandardPipe();
    const result = pipe.transform('2023-05-23T12:15:23');
    expect(result).toEqual('May 23, 2023')
  })
});
