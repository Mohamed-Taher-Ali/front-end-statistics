import { getData } from './apiGetData';

describe('test api fetch data', () => {

  test('should have items', async () => {
    const { data } = await getData();
    expect(!!data.length).toBeTruthy();
  });

  test('should have expected item type', async () => {
    const { data } = await getData();
    const obj = data[0];

    const expected = {
      lessons: "",
      country: "",
      school: "",
      month: "",
      camp: "",
      id: "",
    };

    for(const [key, val] of Object.entries(expected))
      expect(Boolean(obj[key])).toBe(true);
  });
});