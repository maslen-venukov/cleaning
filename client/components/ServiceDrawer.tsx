import React from 'react'

import Drawer, { DrawerProps } from 'antd/lib/drawer'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Space from 'antd/lib/space'
import Form, { FormProps } from 'antd/lib/form'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'
import UploadOutlined from '@ant-design/icons/lib/icons/UploadOutlined'

import { isAdditionalService, isMainService } from '../utils/checkServiceType'

import { Service } from '../types/services'

interface IServiceDrawerProps extends DrawerProps, FormProps {
  title: string
  submitText: string
  currentService: Service
}

const ServiceDrawer: React.FC<IServiceDrawerProps> = ({
  title,
  submitText,
  currentService,
  onClose,
  visible,
  form,
  onFinish
}) => {
  return (
    <Drawer
      title={title}
      placement="right"
      width={480}
      onClose={onClose}
      visible={visible}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите имя!' }]}
        >
          <Input />
        </Form.Item>

        {isMainService(currentService) && (
          <>
            <Form.Item
              label="Цена"
              name="price"
              rules={[{ required: true, message: 'Введите цену!' }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Ед. изм."
              name="units"
              rules={[{ required: true, message: 'Введите единицы измерения!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Информация"
              name="info"
              rules={[{ required: true, message: 'Введите информацию!' }]}
            >
              <Input.TextArea autoSize={{ minRows: 2 }} />
            </Form.Item>

            <Form.List name="includes">
              {(fields, { add, remove }) => (
                <>
                  <p>Включает в себя:</p>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex' }} align="baseline" className="edit-service-space">
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'Введите название' }]}
                      >
                        <Input placeholder="Название" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Добавить
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              label="Изображение"
              name="image"
              valuePropName="file"
              rules={[{ required: true, message: 'Добавьте изображение!' }]}
            >
              <Upload
                accept="image/*"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Нажмите, чтобы загрузить</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        {isAdditionalService(currentService) && (
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                      rules={[{ required: true, message: 'Введите название!' }]}
                    >
                      <Input placeholder="Название" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
                      rules={[{ required: true, message: 'Введите цену!' }]}
                    >
                      <InputNumber placeholder="Цена" style={{ width: 120 }} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'units']}
                      fieldKey={[fieldKey, 'units']}
                      rules={[{ required: true, message: 'Введите единицы измерения!' }]}
                    >
                      <Input placeholder="Ед. изм." />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Добавить опцию
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default ServiceDrawer