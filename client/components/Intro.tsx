import React from 'react'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Typography from 'antd/lib/typography'

interface IIntroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

const Intro: React.FC<IIntroProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <Row
      align="middle"
      className="intro"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : '' }}
    >
      <Col span={24}>
        <Typography.Title>{title}</Typography.Title>
        {subtitle && <Typography.Title level={2}>{subtitle}</Typography.Title>}
      </Col>
    </Row>
  )
}

export default Intro
