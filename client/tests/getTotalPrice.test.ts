import getTotalPrice from '../utils/getTotalPrice'

test('getTotalPrice should return total price of order', () => {
  const order = {
    address: 'Гагарина, 56',
    connection: '83532621862',
    date: new Date('2021.05.07 11:38'),
    isCompleted: true,
    name: 'Алексей',
  }

  expect(getTotalPrice({
    ...order,
    services: {
      additionals: [{
        name: 'Трехстворчатое',
        price: 700,
        units: 'шт',
        value: 2
      }],
      main: {
        name: 'Генеральная уборка',
        price: 80,
        units: 'м2',
        value: 50
      }
    }
  })).toBe(5400)

  expect(getTotalPrice({
    ...order,
    services: {
      additionals: [],
      main: {
        name: 'Поддерживающая уборка',
        price: 60,
        units: 'м2',
        value: 45
      }
    }
  })).toBe(2700)

  expect(getTotalPrice({
    ...order,
    services: {
      additionals: [],
      main: {
        name: 'Поддерживающая уборка',
        price: 60,
        units: 'м2',
        value: 45
      }
    }
  })).toBe(2700)

  expect(getTotalPrice({
    ...order,
    services: {
      additionals: [{
        name: 'Трехстворчатое',
        price: 700,
        units: 'шт',
        value: 2
      }, {
        name: 'Холодильник',
        price: 1000,
        units: 'шт',
        value: 1
      }],
      main: {
        name: 'Уборка после ремонта',
        price: 100,
        units: 'м2',
        value: 100
      }
    }
  })).toBe(12400)
})