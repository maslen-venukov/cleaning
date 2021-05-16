import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../../layouts/AdminLayout'
import Actions from '../../../components/Actions'

import Table from 'antd/lib/table'
import Column from 'antd/lib/table/Column'
import Checkbox from 'antd/lib/checkbox'
import Modal from 'antd/lib/modal'
import Image from 'antd/lib/image'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Drawer from 'antd/lib/drawer'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'

import getDateTime from '../../../utils/getDateTime'

import { fetchPhotoRequests, fetchProcessPhotoRequest, fetchRemovePhotoRequest, sendEmail, setPhotoRequests } from '../../../store/actions/photoRequests'

import { RootState } from '../../../store/reducers'
import { IPhotoRequest } from '../../../types/photoRequests'
import { API_URL } from '../../../types'

interface IFormValues {
  price: number
  comment: string
}

const Photo: React.FC = () => {
  const dispatch = useDispatch()

  const { token } = useSelector((state: RootState) => state.user)
  const { photoRequests, isLoading: isPhotoRequestsLoading } = useSelector((state: RootState) => state.photoRequests)

  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [request, setRequest] = useState<IPhotoRequest | null>(null)
  const [id, setId] = useState<string>('')

  const [form] = Form.useForm()

  useEffect(() => {
    if(!token) {
      return null
    }
    dispatch(fetchPhotoRequests(token))
    return () => {
      dispatch(setPhotoRequests([]))
    }
  }, [token])

  const onRemove = (id: string) => dispatch(fetchRemovePhotoRequest(id, token))
  const onProcess = (id: string) => dispatch(fetchProcessPhotoRequest(id, token))

  const onOpenModal = (record: IPhotoRequest) => {
    setRequest(record)
    setModalVisible(true)
  }

  const onCloseModal = () => setModalVisible(false)

  const onDrawerOpen = (record: IPhotoRequest) => {
    const { _id, name, email } = record
    setId(_id)
    form.setFieldsValue({ name, email })
    setDrawerVisible(true)
  }

  const onDrawerClose = () => setDrawerVisible(false)

  const onSuccess = () => {
    dispatch(fetchProcessPhotoRequest(id, token))
    form.resetFields()
    onDrawerClose()
  }

  const onFormFinish = (values: IFormValues) => {
    const { price, comment } = values
    sendEmail(id, price, comment, token, onSuccess)
  }

  return (
    <AdminLayout>
      <Table
        dataSource={photoRequests}
        rowKey={(record: IPhotoRequest) => record._id}
        loading={isPhotoRequestsLoading}
      >
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Дата" dataIndex="date" key="date" render={(value: string) => getDateTime(new Date(value))} />
        <Column
          title="Действия"
          key="action"
          render={(_, record: IPhotoRequest) => (
            <Actions
              record={record}
              whatToRemove="заявку"
              editText="Отправить письмо"
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
          render={(value: boolean, record: IPhotoRequest) => (
            <Checkbox onChange={() => onProcess(record._id)} checked={value} />
          )}
        />
      </Table>

      <Drawer
        title="Отправка письма"
        placement="right"
        width={480}
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <Form form={form} onFinish={onFormFinish}>
          <Form.Item
            label="Цена"
            name="price"
            rules={[{ required: true, message: 'Введите цену!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Комментарий"
            name="comment"
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
          <Image.PreviewGroup>
            {request.images.map(image => (
              <Image
                key={image}
                width={188}
                height={140}
                src={`${API_URL}/uploads/${image}`}
                className="photo-request-img"
              />
            ))}
          </Image.PreviewGroup>
        </Modal>
      )}
    </AdminLayout>
  )
}

export default Photo
