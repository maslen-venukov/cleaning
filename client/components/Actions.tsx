import React from 'react'

import Button from 'antd/lib/button'
import Popconfirm from 'antd/lib/popconfirm'
import Space from 'antd/lib/space'

interface IRecord {
  _id?: string
}

interface IActionsProps {
  record: IRecord
  whatToRemove: string
  editText?: string
  onOpenModal?: (record: IRecord) => void
  onDrawerOpen?: (record: IRecord) => void
  onRemove?: (id: string) => void
  config?: {
    more?: boolean
    edit?: boolean
    remove?: boolean
  }
}

const Actions: React.FC<IActionsProps> = ({ record, whatToRemove, editText = 'Редактировать' ,onOpenModal, onDrawerOpen, onRemove, config = {} }) => {
  return (
    <Space size="small">
      {config.more ? <Button onClick={() => onOpenModal(record)}>Подробнее</Button> : <></>}
      {config.edit ? <Button onClick={() => onDrawerOpen(record)} type="primary">{editText}</Button> : <></>}
      {config.remove ? (
        <Popconfirm
          title={`Вы действительно хотите удалить ${whatToRemove}?`}
          okText="Да"
          cancelText="Нет"
          onConfirm={() => onRemove(record._id)}
        >
          <Button type="primary" danger>Удалить</Button>
        </Popconfirm>
      ) : <></>}
    </Space>
  )
}

export default Actions
