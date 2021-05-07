import React, { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

import MainLayout from '../layouts/MainLayout'

import Hero from '../components/Hero'
import Container from '../components/Container'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Typography from 'antd/lib/typography'
import Space from 'antd/lib/space'
import Steps from 'antd/lib/steps'
import message from 'antd/lib/message'
import { SolutionOutlined, FormOutlined, FormatPainterOutlined, CheckCircleOutlined } from '@ant-design/icons/lib/icons'

import { IServicesState } from '../types/services'

interface IHomeData {
  services: IServicesState
  error: string
}

interface IHomeProps {
  data: IHomeData
}

const Home: React.FC<IHomeProps> = ({ data }) => {
  useEffect(() => {
    const { error } = data
    if(error) {
      message.error(error)
    }
  }, [data.error])

  return (
    <MainLayout>
      <Hero
        title="Клининговые услуги"
        subtitle="Доверьте уборку профессионалам"
        backgroundImage="intro.jpg"
      />
      <Space direction="vertical" size="large">
        <Container>
          <Form onFinish={() => ({})}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Container>

        {!data.error && (
          <Container>
            <Typography.Title level={3}>Наши услуги</Typography.Title>
              <Typography.Text>Неубранное вовремя помещение – это не только не эстетично и не привлекательно, но еще и реальная угроза для здоровья человека. Ученые доказали, что воздух внутри помещения намного грязнее уличного, и этому способствуют скопления пыли, плесень в ванной комнате и туалете, налет на кухонной плите, вытяжке и пр. Если ваша цель – просто чистая комната, убирайте регулярно. Если вы еще и заботитесь о своем здоровье, пользуйтесь услугами профессионалов.</Typography.Text>
              <Space direction="vertical" size="large">
                {data.services.main.map(service => (
                  <Card
                    key={service._id}
                    title={service.name}
                    extra={<Link href={`/services/${service._id}`}>Подробнее</Link>}
                  >
                    <Typography.Text>{service.info}</Typography.Text>
                  </Card>
                ))}
              </Space>
          </Container>
        )}

        <Container>
          <Typography.Title level={3}>Процесс работы</Typography.Title>
          <Steps >
            <Steps.Step status="finish" title="Вы оставляете заявку" icon={<SolutionOutlined />} />
            <Steps.Step status="finish" title="Уточняем детали" icon={<FormOutlined />} />
            <Steps.Step status="finish" title="Приступаем к работе" icon={<FormatPainterOutlined />} />
            <Steps.Step status="finish" title="Готово" icon={<CheckCircleOutlined />} />
          </Steps>
        </Container>
      </Space>
    </MainLayout>
  )
}

export const getServerSideProps = async () => {
  const data: IHomeData = {
    services: {
      main: [],
      additional: []
    },
    error: ''
  }

  try {
    const [
      { data: main },
      { data: additional }
    ] = await axios.all([
      axios.get('/api/services/main'),
      axios.get('/api/services/additional')
    ])
    data.services = {
      main,
      additional
    }
  } catch (e) {
    data.error = e.response?.data.message || 'Ошибка при загрузке услуг'
  }

  return {
    props: {
      data
    }
  }
}

export default Home