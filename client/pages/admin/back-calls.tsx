import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../layouts/AdminLayout'

import OrderDrawer from '../../components/OrderDrawer'
import Actions from '../../components/Actions'

import Table from 'antd/lib/table'
import Column from 'antd/lib/table/Column'
import Checkbox from 'antd/lib/checkbox'
import Form from 'antd/lib/form'

import getDateTime from '../../utils/getDateTime'
import getPostData from '../../utils/getPostData'

import { fetchBackCalls, setBackCalls, fetchRemoveBackCall, fetchProcessBackCall } from '../../store/actions/backCalls'
import { fetchCreateOrder } from '../../store/actions/orders'

import { RootState } from '../../store/reducers'
import { IBackCall } from '../../types/backCalls'
import { IFormValues } from '../../types'

const BackCalls: React.FC = () => {
  const dispatch = useDispatch()

  const { backCalls, isLoading: isBackCallsLoading } = useSelector((state: RootState) => state.backCalls)
  const { main, additional, isLoading: isServicesLoading } = useSelector((state: RootState) => state.services)

  const [form] = Form.useForm()

  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')

  const onDrawerOpen = (record: IBackCall) => {
    const { _id, name, phone } = record
    setId(_id)
    form.setFieldsValue({ name, phone })
    setDrawerVisible(true)
  }

  const onDrawerClose = () => setDrawerVisible(false)

  useEffect(() => {
    dispatch(fetchBackCalls())
    return () => {
      dispatch(setBackCalls([]))
    }
  }, [])

  const onRemove = (id: string) => dispatch(fetchRemoveBackCall(id))
  const onProcess = (id: string) => dispatch(fetchProcessBackCall(id))

  const onSuccess = () => {
    dispatch(fetchProcessBackCall(id))
    form.resetFields()
    onDrawerClose()
  }

  const onFormFinish = (values: IFormValues) => {
    const data = getPostData(values, main, additional)
    dispatch(fetchCreateOrder(data, onSuccess))
  }

  return (
    <AdminLayout>
      <Table
        dataSource={backCalls}
        rowKey={(record: IBackCall) => record._id}
        loading={isBackCallsLoading}
      >
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Телефон" dataIndex="phone" key="phone" />
        <Column title="Дата" dataIndex="date" key="date" render={(value: string) => getDateTime(new Date(value))} />
        <Column
          title="Действия"
          key="action"
          render={(_, record: IBackCall) => (
            <Actions
              record={record}
              whatToRemove="заявку"
              editText="Заказ"
              onDrawerOpen={onDrawerOpen}
              onRemove={onRemove}
              config={{ edit: true, remove: true }}
            />
          )}
        />
        <Column
          title="Обработан"
          dataIndex="isProcessed"
          key="isProcessed"
          render={(value: boolean, record: IBackCall) => (
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
        config={{ phone: true }}
      />
    </AdminLayout>
  )
}


export default BackCalls