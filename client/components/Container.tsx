import React from 'react'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

const Container: React.FC = ({ children }) => {
  return (
    <Row justify="center">
      <Col lg={12} md={18} sm={24} >
        {children}
      </Col>
    </Row>
  )
}

export default Container
