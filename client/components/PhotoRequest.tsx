import React from 'react'

import Container from './Container'

import Typography from 'antd/lib/typography'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import InboxOutlined from '@ant-design/icons/lib/icons/InboxOutlined'

import { sendPhotoRequest } from '../store/actions/photoRequests'

import { UploadFile } from 'antd/lib/upload/interface'

interface IFormValues {
  name: string
  email: string
  images: UploadFile[]
}

const PhotoRequest: React.FC = () => {
  const [form] = Form.useForm()

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onFinish = (values: IFormValues) => {
    const { name, email } = values
    const images = values.images.map(file => file.originFileObj)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    images.forEach(image => formData.append('images', image))

    sendPhotoRequest(formData, () => ({}))
  }

  return (
    <Container>
      <Typography.Title level={3}>Расчитать стоимость по фотографиям</Typography.Title>
      <Form form={form} onFinish={onFinish} className="drag-form">
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите ваше имя!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите ваш email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="images"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Прикрепите изображения!' }]}
        >
          <Upload.Dragger
            accept="image/*"
            multiple={true}
            maxCount={5}
            className="drag-area"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Нажмите или перетащите изображения в эту область</p>
            <p className="ant-upload-hint">Максимум 5 файлов</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Расчитать стоимость
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default PhotoRequest
