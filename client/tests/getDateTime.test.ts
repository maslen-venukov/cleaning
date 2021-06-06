import getDateTime from '../utils/getDateTime'

test('getDateTime should return string of date and time', () => {
  expect(getDateTime(new Date('18:50:02 2021-05-01'))).toBe('01.05.2021 18:50')
  expect(getDateTime(new Date('2020-02-24 13:15'))).toBe('24.02.2020 13:15')
  expect(getDateTime(new Date('2021'))).toBe('01.01.2021 05:00')
})