import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../layouts/AdminLayout'

import Actions from '../../components/Actions'
import ServiceDrawer from '../../components/ServiceDrawer'

import Table from 'antd/lib/table/Table'
import Column from 'antd/lib/table/Column'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button/button'

import { isMainService, isAdditionalService } from '../../utils/checkServiceType'
import {
  fetchCreateAdditionalService,
  fetchCreateMainService,
  fetchRemoveAdditionalService,
  fetchRemoveMainService,
  fetchUpdateAdditionalService,
  fetchUpdateMainService
} from '../../store/actions/services'

import { RootState } from '../../store/reducers'
import { IMainService, IAdditionalService, IAdditionalServiceOption, Service } from '../../types/services'

interface IFormValues {
  name: string
  price?: number
  units?: string
  info?: string
  includes?: string[]
  options?: IAdditionalServiceOption[]
}

const Services: React.FC = () => {
  const dispatch = useDispatch()

  const token = useSelector((state: RootState) => state.user.token)
  const { main, additional, isLoading } = useSelector((state: RootState) => state.services)

  const [form] = Form.useForm()

  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [isCreateDrawerVisible, setCreateDrawerVisible] = useState<boolean>(false)

  const onOpenModal = (record: Service) => {
    setCurrentService(record)
    setModalVisible(true)
  }

  const onCloseModal = () => setModalVisible(false)

  const onDrawerOpen = (record: Service) => {
    form.setFieldsValue(record)
    setCurrentService(record)
    setDrawerVisible(true)
  }

  const onDrawerClose = () => {
    setDrawerVisible(false)
    setCreateDrawerVisible(false)
    form.resetFields()
  }

  const onCreateDrawerOpen = (record: Service) => {
    form.setFieldsValue(record)
    setCurrentService(record)
    setCreateDrawerVisible(true)
  }

  const onSuccess = () => {
    form.resetFields()
    onDrawerClose()
  }

  const onFormFinish = (values: IFormValues) => {
    const payload = {
      id: currentService._id,
      data: values
    }

    if(isMainService(currentService)) {
      dispatch(fetchUpdateMainService(payload, token, onSuccess))
    }

    if(isAdditionalService(currentService)) {
      dispatch(fetchUpdateAdditionalService(payload, token, onSuccess))
    }
  }

  const onRemoveMainService = (id: string) => dispatch(fetchRemoveMainService(id, token))
  const onRemoveAdditionalService = (id: string) => dispatch(fetchRemoveAdditionalService(id, token))

  const onCreate = (values: IFormValues) => {
    const { name, price, units, info, includes, options } = values

    if(isMainService(currentService)) {
      const data = { name, price, units, info, includes }
      dispatch(fetchCreateMainService(data, token, onSuccess))
    }

    if(isAdditionalService(currentService)) {
      const data = { name, options }
      dispatch(fetchCreateAdditionalService(data, token, onSuccess))
    }
  }

  return (
    <AdminLayout>
      <Table
        title={() => 'Основные услуги'}
        footer={() => (
          <Button
            onClick={() => onCreateDrawerOpen({ name: '', price: '', units: '', includes: [], info: '' })}
            type="primary"
            >
              Добавить
            </Button>
        )}
        dataSource={main}
        rowKey={(record: IMainService) => record._id}
        loading={isLoading}
      >
        <Column title="Название" dataIndex="name" key="name" />
        <Column title="Цена за ед." dataIndex="price" key="price" />
        <Column title="Ед. изм." dataIndex="units" key="units" />
        <Column
          title="Действия"
          key="action"
          render={(_, record: IMainService) => (
            <Actions
              record={record}
              whatToRemove="услугу"
              onOpenModal={onOpenModal}
              onDrawerOpen={onDrawerOpen}
              onRemove={onRemoveMainService}
              config={{ more: true, edit: true, remove: true }}
            />
          )}
        />
      </Table>

      <Table
        title={() => 'Дополнительные услуги'}
        footer={() => (
          <Button
            onClick={() => onCreateDrawerOpen({ name: '', options: [] })}
            type="primary"
            >
              Добавить
            </Button>
        )}
        dataSource={additional}
        rowKey={(record: IAdditionalService) => record._id}
        loading={isLoading}
      >
        <Column title="Название" dataIndex="name" key="name" />
        <Column
          title="Действия"
          key="action"
          render={(_, record: IAdditionalService) => (
            <Actions
              record={record}
              whatToRemove="услугу"
              onOpenModal={onOpenModal}
              onDrawerOpen={onDrawerOpen}
              onRemove={onRemoveAdditionalService}
              config={{ more: true, edit: true, remove: true }}
            />
          )}
        />
      </Table>

      {currentService && (
        <Modal
          title={currentService.name}
          visible={isModalVisible}
          footer={null}
          width={800}
          centered
          onCancel={onCloseModal}
          style={{ paddingTop: 24 }}
        >
          {isMainService(currentService) && (
            <>
              <p>Название: {currentService.name}</p>
              <p>Цена за единицу: {currentService.price}</p>
              <p>Единицы измерения: {currentService.units}</p>
              <p>Текст для отображения: {currentService.info}</p>
              <p>Включает в себя:</p>
              <ul>
                {currentService.includes.map((value: string, index: number) => <li key={index}>{value}</li>)}
              </ul>
            </>
          )}

          {isAdditionalService(currentService) && (
            <Table
              title={() => 'Список опций'}
              dataSource={currentService.options}
              rowKey={(record: IAdditionalServiceOption) => record.name}
              pagination={false}
              style={{ marginBottom: 15 }}
            >
              <Column title="Название" dataIndex="name" key="name" />
              <Column title="Цена за ед." dataIndex="price" key="price" render={(value: string) => `${value} руб.`} />
              <Column title="Ед. изм." dataIndex="units" key="units" />
            </Table>
          )}
        </Modal>
      )}

      {currentService && (
        <>
          <ServiceDrawer
            title="Редактирование услуги"
            submitText="Редактировать"
            currentService={currentService}
            onClose={onDrawerClose}
            visible={isDrawerVisible}
            form={form}
            onFinish={onFormFinish}
          />

          <ServiceDrawer
            title="Добавление услуги"
            submitText="Добавить"
            currentService={currentService}
            onClose={onDrawerClose}
            visible={isCreateDrawerVisible}
            form={form}
            onFinish={onCreate}
          />
        </>
      )}
    </AdminLayout>
  )
}

export default Services
