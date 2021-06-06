import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import AdminLayout from '../../layouts/AdminLayout'

import OrderDrawer from '../../components/OrderDrawer'
import Actions from '../../components/Actions'

import Table from 'antd/lib/table'
import Column from 'antd/lib/table/Column'
import Modal from 'antd/lib/modal'
import Checkbox from 'antd/lib/checkbox'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'

import getDateTime from '../../utils/getDateTime'
import getTotalPrice from '../../utils/getTotalPrice'
import getAdditionalFields from '../../utils/getAdditionalFields'
import getPostData from '../../utils/getPostData'

import { fetchCreateOrder, fetchOrders, fetchRemoveOrder, fetchUpdateOrder, setOrders } from '../../store/actions/orders'

import { RootState } from '../../store/reducers'
import { IService, IMainServiceRecord, IFormValues } from '../../types'
import { IOrder } from '../../types/orders'

const Orders: React.FC = () => {
  const dispatch = useDispatch()

  const { orders, isLoading } = useSelector((state: RootState) => state.orders)
  const { main, additional, isLoading: isServicesLoading } = useSelector((state: RootState) => state.services)

  const [form] = Form.useForm()

  const [order, setOrder] = useState<IOrder | null>(null)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isEditDrawerVisible, setEditDrawerVisible] = useState<boolean>(false)
  const [isCreateDrawerVisible, setCreateDrawerVisible] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchOrders())
    return () => {
      dispatch(setOrders([]))
    }
  }, [])

  const onRemove = (id: string) => dispatch(fetchRemoveOrder(id))

  const onComplete = (id: string) => {
    const order = orders.find(order => order._id === id)
    const payload = { id, data: { ...order, isCompleted: !order.isCompleted } }
    dispatch(fetchUpdateOrder(payload))
  }

  const onOpenModal = (record: IOrder) => {
    setOrder(record)
    setModalVisible(true)
  }

  const onCloseModal = () => setModalVisible(false)

  const onEditDrawerOpen = (record: IOrder) => {
    const { name, connection, address, date, services, comment } = record
    const { value } = services.main
    const mainService = main.find(el => el.name === services.main.name)
    const additionals = getAdditionalFields(additional, record)
    setOrder(record)
    form.setFieldsValue({ name, connection, address, date: moment(date), main: mainService?._id || '', value, comment, additionals })
    setEditDrawerVisible(true)
  }

  const onDrawerClose = () => {
    form.resetFields()
    setEditDrawerVisible(false)
    setCreateDrawerVisible(false)
  }

  const onSuccess = () => {
    form.resetFields()
    onDrawerClose()
    message.success('Заказ успешно изменен')
  }

  const onFormFinish = (values: IFormValues) => {
    const data = getPostData(values, main, additional)
    console.log(data)
    dispatch(fetchUpdateOrder({ id: order._id, data }, onSuccess))
  }

  const onCreate = (values: IFormValues) => {
    const data = getPostData(values, main, additional)
    dispatch(fetchCreateOrder(data, onSuccess))
  }

  return (
    <AdminLayout>
      <Table
        footer={() => (
          <Button
            onClick={() => setCreateDrawerVisible(true)}
            type="primary"
            >
              Добавить
            </Button>
        )}
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
            <Actions
              record={record}
              whatToRemove="заказ"
              onOpenModal={onOpenModal}
              onDrawerOpen={onEditDrawerOpen}
              onRemove={onRemove}
              config={{ more: true, edit: true, remove: true }}
            />
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

      <OrderDrawer
        title="Создание заказа"
        submitText="Создать"
        onClose={onDrawerClose}
        visible={isCreateDrawerVisible}
        form={form}
        onFinish={onCreate}
        isLoading={isServicesLoading}
        main={main}
        additional={additional}
        config={{ connection: true }}
      />

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
              rowKey={(record: IService) => record.name}
              pagination={false}
              style={{ marginBottom: 15 }}
            >
              <Column title="Название услуги" dataIndex="name" key="name" />
              <Column title="Цена за ед." dataIndex="price" key="price" render={(value: string) => `${value} руб.`} />
              <Column title="Ед. изм." dataIndex="units" key="units" />
              <Column title="Значение" dataIndex="value" key="value" render={(value: string, record: IMainServiceRecord) => `${value} ${record.units === 'м2' ? 'м' : ''}`}  />
              <Column title="Стоимость" dataIndex="result" key="result" render={(_, record: IMainServiceRecord) => `${Number(record.price) * record.value} руб.`} />
            </Table>

            {order.services.additionals.length ? (
              <Table
                dataSource={order.services.additionals}
                title={() => 'Дополнительные услуги'}
                rowKey={(record: IService) => record.name}
                pagination={false}
                style={{ marginBottom: 30 }}
              >
                <Column title="Название услуги" dataIndex="name" key="name" />
                <Column title="Цена за ед." dataIndex="price" key="price" render={(value: string) => `${value} руб.`} />
                <Column title="Ед. изм." dataIndex="units" key="units" />
                <Column title="Значение" dataIndex="value" key="value" render={(value: string, record: IMainServiceRecord) => `${value} ${record.units === 'м2' ? 'м' : ''}`}  />
                <Column title="Стоимость" dataIndex="result" key="result" render={(_, record: IMainServiceRecord) => `${Number(record.price) * record.value} руб.`} />
              </Table>
            ) : <></>}

            <p style={{ margin: 0 }}>Общая стоимость: {getTotalPrice(order)} руб.</p>
          </Modal>

          <OrderDrawer
            title="Редактирование заказа"
            submitText="Редактировать"
            onClose={onDrawerClose}
            visible={isEditDrawerVisible}
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