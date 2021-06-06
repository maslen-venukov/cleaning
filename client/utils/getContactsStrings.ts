import { IOrderDrawerConfig } from "../components/OrderDrawer"

const getContactStrings = (config: IOrderDrawerConfig): { label: string, name: string } => {
  const { phone, email } = config
  switch(true) {
    case phone:
      return {
        label: 'Телефон',
        name: 'phone'
      }

    case email:
      return {
        label: 'Email',
        name: 'email'
      }

    default:
      return {
        label: 'Телефон/email',
        name: 'connection'
      }
  }
}

export default getContactStrings