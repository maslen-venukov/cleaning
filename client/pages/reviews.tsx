import React, { useEffect } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import MainLayout from '../layouts/MainLayout'

import Hero from '../components/Hero'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import List from 'antd/lib/list'
import Comment from 'antd/lib/comment'

import getDateTime from '../utils/getDateTime'
import emptyLocale from '../utils/emptyLocale'

import { IReview } from '../types/reviews'

interface IReviewsData {
  reviews: IReview[]
  error: string
}

interface IReviewsProps {
  data: IReviewsData
}

// TODO сделать добавление заказа
// TODO сделать добавление отзыва
// TODO сделать калькулятор

const Reviews: React.FC<IReviewsProps> = ({ data }) => {
  useEffect(() => {
    const { error } = data
    if(error) {
      message.error(error)
    }
  }, [data.error])

  return (
    <MainLayout title="Отзывы">
      <Hero
        title="Отзывы наших клиентов"
        backgroundImage="reviews.jpg"
      />
      {!data.error && (
        <Row justify="center">
          <Col span={12}>
            <List
              header="Список отзывов"
              itemLayout="horizontal"
              dataSource={data.reviews}
              locale={emptyLocale}
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
          </Col>
        </Row>
      )}
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