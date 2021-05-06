import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../layouts/AdminLayout'

import Table from 'antd/lib/table'
import Column from 'antd/lib/table/Column'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import Popconfirm from 'antd/lib/popconfirm'
import Space from 'antd/lib/space'
import Drawer from 'antd/lib/drawer'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'

import getDateTime from '../../utils/getDateTime'
import emptyLocale from '../../utils/emptyLocale'

import { fetchAllReviews, fetchRemoveReview, fetchUpdateReview } from '../../store/actions/reviews'

import { RootState } from '../../store/reducers'
import { IReview } from '../../types/reviews'

interface IFormData {
  name: string
  text: string
}

const Reviews: React.FC = () => {
  const dispatch = useDispatch()

  const { token } = useSelector((state: RootState) => state.user)
  const reviews = useSelector((state: RootState) => state.reviews)
  const isLoading = useSelector((state: RootState) => state.isLoading)

  const [form] = Form.useForm()

  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')

  const onDrawerOpen = (record: IReview) => {
    const { _id, name, text } = record
    setDrawerVisible(true)
    form.setFieldsValue({ name, text })
    setId(_id)
  }

  const onDrawerClose = () => setDrawerVisible(false)

  useEffect(() => {
    if(!token) {
      return null
    }
    dispatch(fetchAllReviews(token))
  }, [token])

  const onRemove = (id: string) => dispatch(fetchRemoveReview(id, token))

  const onProcess = (id: string, value: boolean) => {
    const payload = { id, data: { isProcessed: !value } }
    dispatch(fetchUpdateReview(payload, token))
  }

  const onFormFinish = (values: IFormData) => {
    const payload = { id, data: { ...values, isProcessed: true } }
    dispatch(fetchUpdateReview(payload, token))
    form.resetFields()
    onDrawerClose()
    message.success('Отзыв отправлен')
  }

  return (
    <AdminLayout>
      <Table
        dataSource={reviews}
        rowKey={(record: IReview) => record._id}
        locale={emptyLocale}
        loading={isLoading}
      >
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Текст" dataIndex="text" key="text" />
        <Column title="Дата" dataIndex="date" key="date" render={(value: string) => getDateTime(new Date(value))} />
        <Column
          title="Действия"
          key="action"
          render={(value, record: IReview) => (
            <Space size="small">
              <Button type="primary" onClick={() => onDrawerOpen(record)}>Редактировать</Button>
              <Popconfirm
                title="Вы действительно хотите удалить отзыв?"
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
          title="Обработан"
          dataIndex="isProcessed"
          key="isProcessed"
          render={(value: boolean, record: IReview) => (
            <Checkbox onChange={() => onProcess(record._id, value)} checked={value} />
          )}
        />
      </Table>

      <Drawer
        title="Редактирование отзыва"
        placement="right"
        width={480}
        closable={false}
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <Form form={form} onFinish={onFormFinish}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите имя!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Текст"
            name="text"
            rules={[{ required: true, message: 'Введите текст!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </AdminLayout>
  )
}

export default Reviews
