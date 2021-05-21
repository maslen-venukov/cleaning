import React, { useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

import MainLayout from '../../layouts/MainLayout'

import Hero from '../../components/Hero'
import Container from '../../components/Container'
import HomeBtn from '../../components/HomeBtn'

import Typography from 'antd/lib/typography'
import Alert from 'antd/lib/alert'
import Result from 'antd/lib/result'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import message from 'antd/lib/message'
import CheckCircleTwoTone from '@ant-design/icons/lib/icons/CheckCircleTwoTone'

import { API_URL } from '../../types'
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

  return data.service ? (
    <MainLayout title={data.service.name}>
      <Hero
        title={data.service.name}
        backgroundImage="../services.jpg"
      />
      <Container>
        <Row gutter={15}>
          <Col md={6}>
            <Image
              src={`${API_URL}/uploads/${data.service.image}`}
              alt={data.service.name}
              width={500}
              height={500}
              className="services-img"
            />
          </Col>
          <Col md={18}>
            <Typography.Title level={3}>{data.service.name}</Typography.Title>
            <Typography.Text>{data.service.info}</Typography.Text>
          </Col>
        </Row>
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
  ) : (
    <Result
      status="500"
      title="Что-то пошло не так"
      subTitle={data.error}
      extra={<HomeBtn />}
    />
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
    data.error = e.response?.data.message || 'Ошибка при загрузке услуг'
  }

  return {
    props: {
      data
    }
  }
}

export default Service
