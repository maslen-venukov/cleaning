import getContactsStrings from '../utils/getContactsStrings'

test('getContactsStrings should return object with label and name', () => {
  expect(getContactsStrings({ email: true })).toEqual({ label: 'Email', name: 'email' })
  expect(getContactsStrings({ email: true, phone: true })).toEqual({ label: 'Телефон', name: 'phone' })
  expect(getContactsStrings({})).toEqual({ label: 'Телефон/email', name: 'connection' })
})