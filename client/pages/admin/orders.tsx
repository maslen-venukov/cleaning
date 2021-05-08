import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import AdminLayout from '../../layouts/AdminLayout'

import OrderDrawer from '../../components/OrderDrawer'

import Table from 'antd/lib/table'
import Column from 'antd/lib/table/Column'
import Space from 'antd/lib/space'
import Popconfirm from 'antd/lib/popconfirm'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import Checkbox from 'antd/lib/checkbox'
import Form from 'antd/lib/form'
import message from 'antd/lib/message'

import getDateTime from '../../utils/getDateTime'
import getTotalPrice from '../../utils/getTotalPrice'
import getAdditionalFields from '../../utils/getAdditionalFields'

import { fetchOrders, fetchRemoveOrder, fetchUpdateOrder, setOrders } from '../../store/actions/orders'

import { RootState } from '../../store/reducers'
import { IOrder, IOrderService } from '../../types/orders'
import { IMainService } from '../../types/services'

interface IMainServiceRecord extends IMainService {
  value: number
}

interface IFormValues {
  name: string
  connection: string
  address: string
  date: {
    _d: Date
  }
  comment?: string
  main: string
  value: number
  additionals: { name: string[], value: number }[]
}

const Orders: React.FC = () => {
  const dispatch = useDispatch()

  const { token } = useSelector((state: RootState) => state.user)
  const { orders, isLoading } = useSelector((state: RootState) => state.orders)
  const { main, additional, isLoading: isServicesLoading } = useSelector((state: RootState) => state.services)

  const [form] = Form.useForm()

  const [order, setOrder] = useState<IOrder | null>(null)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)

  useEffect(() => {
    if(!token) {
      return null
    }
    dispatch(fetchOrders(token))
    return () => {
      dispatch(setOrders([]))
    }
  }, [token])

  const onRemove = (id: string) => dispatch(fetchRemoveOrder(id, token))

  const onComplete = (id: string) => {
    const order = orders.find(order => order._id === id)
    const payload = { id, data: { ...order, isCompleted: !order.isCompleted } }
    dispatch(fetchUpdateOrder(payload, token, () => ({})))
  }

  const onOpenModal = (record: IOrder) => {
    setOrder(record)
    setModalVisible(true)
  }

  const onCloseModal = () => setModalVisible(false)

  const onDrawerOpen = (record: IOrder) => {
    const { name, connection, address, date, services, comment } = record
    const { value } = services.main
    const mainService = main.find(el => el.name === services.main.name)
    const additionals = getAdditionalFields(additional, record)
    setOrder(record)
    form.setFieldsValue({ name, connection, address, date: moment(date), main: mainService._id, value: value, comment, additionals })
    setDrawerVisible(true)
  }

  const onDrawerClose = () => setDrawerVisible(false)

  const onFormFinish = (values: IFormValues) => {
    const { name, connection, address, date, comment, value, additionals } = values

    const { name: serviceName, price, units } = main.find(service => service._id === values.main)

    const additionalService = additionals ? additionals.map(service => {
      const options = additional.find(el => el._id === service.name[0]).options
      const option = options.find(el => el._id === service.name[1])
      const { value } = service
      return { ...option, value }
    }) : []

    const data: IOrder = {
      name,
      connection,
      address,
      date: new Date(date._d),
      comment,
      services: {
        main: {
          name: serviceName,
          price,
          units,
          value
        },
        additionals: additionalService
      }
    }

    dispatch(fetchUpdateOrder({ id: order._id, data }, token, () => {
      form.resetFields()
      onDrawerClose()
      message.success('Заказ успешно изменен')
    }))
  }

  return (
    <AdminLayout>
      <Table
        dataSource={orders}
        rowKey={(record: IOrder) => record._id}
        loading={isLoading}
      >
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Телефон/email" dataIndex="connection" key="connection" />
        <Column title="Адрес" dataIndex="address" key="address" />
        <Column title="Дата" dataIndex="date" key="date" render={(value: string) => getDateTime(new Date(value))} />
        <Column
          title="Действия"
          key="action"
          render={(_, record: IOrder) => (
            <Space size="small">
              <Button onClick={() => onOpenModal(record)}>Подробнее</Button>
              <Button type="primary" onClick={() => onDrawerOpen(record)}>Редактировать</Button>
              <Popconfirm
                title="Вы действительно хотите удалить заказ?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => onRemove(record._id)}
              >
                <Button type="primary" danger>Удалить</Button>
              </Popconfirm>
            </Space>
          )}
        />
        <Column
          title="Выполнен"
          dataIndex="isCompleted"
          key="isCompleted"
          render={(value: boolean, record: IOrder) => (
            <Checkbox onChange={() => onComplete(record._id)} checked={value} />
          )}
        />
      </Table>

      {order && (
        <>
          <Modal
            title="Информация о заказе"
            visible={isModalVisible}
            footer={null}
            width={800}
            centered
            onCancel={onCloseModal}
            style={{ paddingTop: 24 }}
          >
            <p>Заказчик: {order.name}</p>
            <p>Телефон/email: {order.connection}</p>
            <p>Адрес: {order.address}</p>
            <p>Назначен на: {getDateTime(new Date(order.date))}</p>
            <p>Выполнен: {order.isCompleted ? 'Да' : 'Нет'}</p>
            {order.comment && <p>Комментарий: {order.comment}</p>}

            <Table
              dataSource={[order.services.main]}
              title={() => 'Основная услуга'}
              rowKey={(record: IOrderService) => record.name}
              pagination={false}
              style={{ marginBottom: 15 }}
            >
              <Column title="Название услуги" dataIndex="name" key="name" />
              <Column title="Цена за ед." dataIndex="price" key="price" render={(value: string) => `${value} руб.`} />
              <Column title="Ед. изм." dataIndex="units" key="units" />
              <Column title="Значение" dataIndex="value" key="value" render={(value: string, record: IMainServiceRecord) => `${value} ${record.units === 'м2' ? 'м' : ''}`}  />
              <Column title="Стоимость" dataIndex="result" key="result" render={(value: string, record: IMainServiceRecord) => `${record.price * record.value} руб.`} />
            </Table>

            {order.services.additionals.length ? (
              <Table
                dataSource={order.services.additionals}
                title={() => 'Дополнительные услуги'}
                rowKey={(record: IOrderService) => record.name}
                pagination={false}
                style={{ marginBottom: 30 }}
              >
                <Column title="Название услуги" dataIndex="name" key="name" />
                <Column title="Цена за ед." dataIndex="price" key="price" render={(value: string) => `${value} руб.`} />
                <Column title="Ед. изм." dataIndex="units" key="units" />
                <Column title="Значение" dataIndex="value" key="value" render={(value: string, record: IMainServiceRecord) => `${value} ${record.units === 'м2' ? 'м' : ''}`}  />
                <Column title="Стоимость" dataIndex="result" key="result" render={(value: string, record: IMainServiceRecord) => `${record.price * record.value} руб.`} />
              </Table>
            ) : <></>}

            <p style={{ margin: 0 }}>Общая стоимость: {getTotalPrice(order)} руб.</p>
          </Modal>

          <OrderDrawer
            title="Редактирование заказа"
            submitText="Редактировать"
            onClose={onDrawerClose}
            visible={isDrawerVisible}
            form={form}
            onFinish={onFormFinish}
            isLoading={isServicesLoading}
            main={main}
            additional={additional}
            config={{ connection: true }}
          />
        </>
      )}
    </AdminLayout>
  )
}

export default Orders