import React, { useEffect } from 'react'
import axios from 'axios'

import MainLayout from '../../layouts/MainLayout'

import Hero from '../../components/Hero'
import Container from '../../components/Container'

import Typography from 'antd/lib/typography'
import Alert from 'antd/lib/alert'
import List from 'antd/lib/list'
import message from 'antd/lib/message'
import CheckCircleTwoTone from '@ant-design/icons/lib/icons/CheckCircleTwoTone'

import { IMainService } from '../../types/services'

interface IServiceData {
  service: IMainService | null
  error: string
}

interface IServiceProps {
  data: IServiceData
}

const Service: React.FC<IServiceProps> = ({ data }) => {
  useEffect(() => {
    const { error } = data
    if(error) {
      message.error(error)
    }
  }, [data.error])

  return (
    <MainLayout title={data.service.name}>
      <Hero
        title={data.service.name}
        backgroundImage="../services.jpg"
      />
      <Container>
        <Typography.Title level={3}>{data.service.name}</Typography.Title>
        <Typography.Text>{data.service.info}</Typography.Text>
        <Alert style={{ margin: '15px 0' }} message={`${data.service.price} руб. ${data.service.units}`} type="info" />
        <List
          dataSource={data.service.includes}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<CheckCircleTwoTone />}
                title={item}
              />
            </List.Item>
          )}
        />
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  const data: IServiceData = {
    service: null,
    error: ''
  }

  try {
    const res = await axios.get(`/api/services/main/${id}`)
    data.service = res.data
  } catch (e) {
    data.error = e.response?.data.message || 'Ошибка при загрузке отзывов'
  }

  return {
    props: {
      data
    }
  }
}

export default Service
