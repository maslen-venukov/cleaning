import React, { useEffect } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import MainLayout from '../layouts/MainLayout'

import Intro from '../components/Intro'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import List from 'antd/lib/list'
import Comment from 'antd/lib/comment'

import getDateTime from '../utils/getDateTime'
import emptyLocale from '../utils/emptyLocale'

import { IReviewsState, IReview } from '../types/reviews'

interface IReviewsProps {
  data: IReviewsState
}

// TODO сделать обработку отзывов в админке
// TODO сделать добавление заказа

const Reviews: React.FC<IReviewsProps> = ({ data }) => {
  useEffect(() => {
    if(data.error) {
      message.error(data.error)
    }
  }, [data.error])

  return (
    <MainLayout title="Отзывы">
      {/* <Intro
        title="Отзывы наших клиентов"
        backgroundImage="reviews.jpg"
      /> */}
      {!data.error && (
        <Row justify="center" style={{ paddingTop: 15 }}>
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
  const data: IReviewsState = {
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