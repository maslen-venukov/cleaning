import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import axios from 'axios'

import MainLayout from '../layouts/MainLayout'

import Hero from '../components/Hero'
import Container from '../components/Container'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Typography from 'antd/lib/typography'
import Space from 'antd/lib/space'
import Steps from 'antd/lib/steps'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import Cascader from 'antd/lib/cascader'
import message from 'antd/lib/message'
import SolutionOutlined from '@ant-design/icons/lib/icons/SolutionOutlined'
import FormOutlined from '@ant-design/icons/lib/icons/FormOutlined'
import FormatPainterOutlined from '@ant-design/icons/lib/icons/FormatPainterOutlined'
import CheckCircleOutlined from '@ant-design/icons/lib/icons/CheckCircleOutlined'
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'

import { sendCalcRequest } from '../store/actions/calcRequests'

import { RootState } from '../store/reducers'
import { IMainService, IAdditionalService } from '../types/services'
import getPostData from '../utils/getPostData'

interface IHomeData {
  services: {
    main: IMainService[]
    additional: IAdditionalService[]
  }
  error: string
}

interface IHomeProps {
  data: IHomeData
}

interface IFormValues {
  name: string
  email: string
  main: string
  value: number
  additionals: { name: string[], value: number }[]
}

const Home: React.FC<IHomeProps> = ({ data }) => {
  const dispatch = useDispatch()

  const { main, additional, isLoading } = useSelector((state: RootState) => state.services)

  useEffect(() => {
    const { error } = data
    if(error) {
      message.error(error)
    }
  }, [data.error])

  const onFormFinish = (values: IFormValues) => {
    const data = getPostData(values, main, additional)
    sendCalcRequest(data)
  }

  return (
    <MainLayout>
      <Hero
        title="Клининговые услуги"
        subtitle="Доверьте уборку профессионалам"
        backgroundImage="intro.jpg"
      />
      <Space direction="vertical" size="large">
        <Container>
          <Typography.Title level={3}>Калькулятор клининговых услуг</Typography.Title>
          <Form onFinish={onFormFinish}>
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
              label="Вид уборки"
              name="main"
              rules={[{ required: true, message: 'Выберите вид уборки!' }]}
            >
              {!isLoading ? (
                <Select
                  showSearch
                  placeholder="Выберите услугу"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {main.map(service => (
                    <Select.Option key={service._id} value={service._id}>{service.name}</Select.Option>
                  ))}
                </Select>
              ) : <Spin />}
            </Form.Item>

            <Form.Item
              label="Площадь"
              name="value"
              rules={[{ required: true, message: 'Введите площадь!' }]}
            >
              <Input />
            </Form.Item>

            {!isLoading ? (
              <Form.List name="additionals">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex' }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          fieldKey={[fieldKey, 'name']}
                          rules={[{ required: true, message: 'Выберите услугу!' }]}
                        >
                          <Cascader
                            options={additional}
                            fieldNames={{ label: 'name', value: '_id', children: 'options' }}
                            placeholder="Выберите услугу"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          fieldKey={[fieldKey, 'value']}
                          rules={[{ required: true, message: 'Введите количество!' }]}
                        >
                          <InputNumber placeholder="Количество" style={{ width: 160 }} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Добавить дополнитульную услугу
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            ) : <Spin />}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Расчитать стоимость
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