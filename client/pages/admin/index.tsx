import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import AdminLayout from '../../layouts/AdminLayout'

import { RootState } from '../../store/reducers'

const Admin: React.FC = () => {
  const router = useRouter()

  return (
    <AdminLayout>
      admin
    </AdminLayout>
  )
}

export default Admin
