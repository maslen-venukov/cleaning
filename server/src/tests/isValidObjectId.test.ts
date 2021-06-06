import isValidObjectId from '../utils/isValidObjectId'

test('isValidObjectId should return object id is valid or not', () => {
  expect(isValidObjectId('60bcc9696a413f29972f7edc')).toBe(true)
  expect(isValidObjectId('60bcc9e43eced90e19bba727')).toBe(true)
  expect(isValidObjectId('125161')).toBe(false)
  expect(isValidObjectId('413f297edc')).not.toBeUndefined()
})