import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../../layouts/AdminLayout'

import Actions from '../../../components/Actions'
import OrderDrawer from '../../../components/OrderDrawer'

import Table from 'antd/lib/table'
import Checkbox from 'antd/lib/checkbox'
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal'
import Column from 'antd/lib/table/Column'

import getDateTime from '../../../utils/getDateTime'
import getPostData from '../../../utils/getPostData'
import getAdditionalFields from '../../../utils/getAdditionalFields'
import getTotalPrice from '../../../utils/getTotalPrice'

import { fetchCalcRequests, fetchProcessCalcRequest, fetchRemoveCalcRequest, setCalcRequests } from '../../../store/actions/calcRequests'
import { fetchCreateOrder } from '../../../store/actions/orders'

import { RootState } from '../../../store/reducers'
import { ICalcRequest } from '../../../types/calcRequests'
import { IService, IMainServiceRecord, IFormValues } from '../../../types'

const Calc: React.FC = () => {
  const dispatch = useDispatch()

  const { token } = useSelector((state: RootState) => state.user)
  const { calcRequests, isLoading: isCalcRequestsLoading } = useSelector((state: RootState) => state.calcRequests)
  const { main, additional, isLoading: isServicesLoading } = useSelector((state: RootState) => state.services)

    const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [request, setRequest] = useState<ICalcRequest | null>(null)
  const [id, setId] = useState<string>('')

  const [form] = Form.useForm()

  useEffect(() => {
    if(!token) {
      return null
    }
    dispatch(fetchCalcRequests(token))
    return () => {
      dispatch(setCalcRequests([]))
    }
  }, [token])

  const onDrawerOpen = (record: ICalcRequest) => {
    const { _id, name, email, services } = record
    const { value } = services.main

    const mainService = main.find(el => el.name === services.main.name)
    const additionals = getAdditionalFields(additional, record)

    setId(_id)
    form.setFieldsValue({ name, email, main: mainService?._id || '', value, additionals })
    setDrawerVisible(true)
  }

  const onDrawerClose = () => setDrawerVisible(false)

  const onRemove = (id: string) => dispatch(fetchRemoveCalcRequest(id, token))
  const onProcess = (id: string) => dispatch(fetchProcessCalcRequest(id, token))

  const onSuccess = () => {
    dispatch(fetchProcessCalcRequest(id, token))
    form.resetFields()
    onDrawerClose()
  }

  const onFormFinish = (values: IFormValues) => {
    const data = getPostData(values, main, additional)
    dispatch(fetchCreateOrder(data, token, onSuccess))
  }

  const onOpenModal = (record: ICalcRequest) => {
    setRequest(record)
    setModalVisible(true)
  }

  const onCloseModal = () => setModalVisible(false)

  return (
    <AdminLayout>
      <Table
        dataSource={calcRequests}
        rowKey={(record: ICalcRequest) => record._id}
        loading={isCalcRequestsLoading}
      >
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Дата" dataIndex="date" key="date" render={(value: string) => getDateTime(new Date(value))} />
        <Column
          title="Действия"
          key="action"
          render={(_, record: ICalcRequest) => (
            <Actions
              record={record}
              whatToRemove="заявку"
              editText="Заказ"
              onDrawerOpen={onDrawerOpen}
              onRemove={onRemove}
              onOpenModal={onOpenModal}
              config={{ edit: true, remove: true, more: true }}
            />
          )}
        />
        <Column
          title="Обработан"
          dataIndex="isProcessed"
          key="isProcessed"
          render={(value: boolean, record: ICalcRequest) => (
            <Checkbox onChange={() => onProcess(record._id)} checked={value} />
          )}
        />
      </Table>

      <OrderDrawer
        title="Создание заказа"
        submitText="Создать"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
        form={form}
        onFinish={onFormFinish}
        isLoading={isServicesLoading}
        main={main}
        additional={additional}
        config={{ email: true }}
      />

      {request && (
        <Modal
          title="Информация о заявке"
          visible={isModalVisible}
          footer={null}
          width={800}
          centered
          onCancel={onCloseModal}
          style={{ paddingTop: 24 }}
        >
          <p>Заказчик: {request.name}</p>
          <p>Email: {request.email}</p>
          <p>Дата подачи заявки: {getDateTime(new Date(request.date))}</p>

          <Table
            dataSource={[request.services.main]}
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

          {request.services.additionals.length ? (
            <Table
              dataSource={request.services.additionals}
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

          <p style={{ margin: 0 }}>Общая стоимость: {getTotalPrice(request)} руб.</p>
        </Modal>
      )}
    </AdminLayout>
  )
}

export default Calc
