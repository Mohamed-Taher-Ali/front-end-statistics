import { generateUniqueColor, generateUniqueColors, getArrangedMonths, months } from './helpers';

describe('test helpers', () => {
  const checkColorCriteria = (color: string) => color[0] === '#' && color.length === 7;
  const checkColorCond = (cond: boolean) => expect(cond).toBeTruthy();

  test('generateUniqueColor should generate correct hexa color', async () => {
    const color = generateUniqueColor();
    checkColorCond(checkColorCriteria(color));
  });

  test('generateUniqueColors should generate array of correct hexa colors', async () => {
    const array = generateUniqueColors(5);
    array.map((c) => checkColorCond(checkColorCriteria(c)));
    expect(array.length).toBe(5);
  });


  test('check arranged array of months', async () => {
    const arrangedMonths = getArrangedMonths();
    expect(arrangedMonths).toEqual(expect.arrayContaining(months));
  });


});