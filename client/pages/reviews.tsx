import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import MainLayout from '../layouts/MainLayout'

import Hero from '../components/Hero'
import Container from '../components/Container'

import List from 'antd/lib/list'
import Comment from 'antd/lib/comment'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import message from 'antd/lib/message'

import getDateTime from '../utils/getDateTime'

import { sendReview } from '../store/actions/reviews'

import { IReview } from '../types/reviews'

interface IReviewsData {
  reviews: IReview[]
  error: string
}

interface IReviewsProps {
  data: IReviewsData
}

interface IReviewsFormValues {
  name: string
  text: string
}

// TODO сделать редактирование заказа
// TODO сделать калькулятор
// TODO сделать обработку заявки через калькулятор
// TODO сделать обработку заявки с фото
// TODO сделать отправку на почту (приход заявок админу, стоимость уборки в ответ на заявку)

const Reviews: React.FC<IReviewsProps> = ({ data }) => {
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    const { error } = data
    if(error) {
      message.error(error)
    }
  }, [data.error])

  const onFormFinish = (values: IReviewsFormValues) => {
    const { name, text } = values
    dispatch(sendReview(name, text))
    form.resetFields()
  }

  return (
    <MainLayout title="Отзывы">
      <Hero
        title="Отзывы наших клиентов"
        backgroundImage="reviews.jpg"
      />

      <Container>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {!data.error && (
            <List
              header="Список отзывов"
              itemLayout="horizontal"
              dataSource={data.reviews}
              renderItem={(review: IReview) => (
                <li>
                  <Comment
                    author={review.name}
                    content={review.text}
                    datetime={getDateTime(new Date(review.date))}
                  />
                </li>
              )}
            />
          )}

          <Form form={form} onFinish={onFormFinish}>
            <Form.Item
              label="Ваше имя"
              name="name"
              rules={[{ required: true, message: 'Введите ваше имя!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Текст отзыва"
              name="text"
              rules={[{ required: true, message: 'Введите текст!' }]}
            >
              <Input.TextArea autoSize={{ minRows: 2 }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Добавить отзыв
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps = async () => {
  const data: IReviewsData = {
    reviews: [],
    error: ''
  }

  try {
    const res = await axios.get('/api/reviews/processed')
    data.reviews = res.data
  } catch (e) {
    data.error = e.response?.data.message || 'Ошибка при загрузке отзывов'
  }

  return {
    props: {
      data
    }
  }
}

export default Reviews