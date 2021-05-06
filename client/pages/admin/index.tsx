import Typography from 'antd/lib/typography'
import React from 'react'

import AdminLayout from '../../layouts/AdminLayout'

const Admin: React.FC = () => {
  return (
    <AdminLayout>
      <Typography.Title level={5}>Добро пожаловать в админ панель</Typography.Title>
      <Typography.Text>Выберите один из пунктов меню на панели слева</Typography.Text>
    </AdminLayout>
  )
}

export default Admin
