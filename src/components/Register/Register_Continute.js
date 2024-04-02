import React from 'react'
import { Button, Col, Flex, Row, Typography } from 'antd'
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export default function Register() {
  return (
    <div style={{ background: '#1D1D1D', width: '100vw', height: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: 800, color: '#F24E1E', padding: 50 }}>OrangeC</Text>
        <Link to='/' style={{ fontSize: 17, fontWeight: 800, color: '#FFF', padding: 50 }}>Đăng nhập</Link>
      </header>

      <body style={{ padding: 80 }}>
        <Row justify='center'>
          <Col span={14} style={{ alignItems: 'center' }}>
            <img src='./images/Hello.svg' style={{ height: '600px', width: '100%' }}></img>
          </Col>

          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Title style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800', fontSize: 22 }}>Mã OTP đã được gửi đến số điện thoại của bạn</Title>

              <Text style={{ color: 'white', marginTop: '30px' }}>Vui lòng điền mã OTP</Text>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                <input name='' type='text' placeholder='0' style={{ backgroundColor: '#2E2E2E', width: '15%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF', marginLeft: '10px', textAlign: 'center' }}></input>
                <input name='' type='text' placeholder='0' style={{ backgroundColor: '#2E2E2E', width: '15%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF', marginLeft: '10px', textAlign: 'center' }}></input>
                <input name='' type='text' placeholder='0' style={{ backgroundColor: '#2E2E2E', width: '15%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF', marginLeft: '10px', textAlign: 'center' }}></input>
                <input name='' type='text' placeholder='0' style={{ backgroundColor: '#2E2E2E', width: '15%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF', marginLeft: '10px', textAlign: 'center' }}></input>
                <input name='' type='text' placeholder='0' style={{ backgroundColor: '#2E2E2E', width: '15%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF', marginLeft: '10px', textAlign: 'center' }}></input>
                <input name='' type='text' placeholder='0' style={{ backgroundColor: '#2E2E2E', width: '15%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF', marginLeft: '10px', textAlign: 'center' }}></input>
              </div>

              <Row justify='center' >
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <Link to='/registerinf'>
                    <Button style={{ width: '440px', height: '60px', fontSize: '24px', fontWeight: '800px', color: '#FFFFFF', backgroundColor: '#F24E1E', borderColor: '#F24E1E', marginTop: '150px', fontWeight: '600' }}>
                      Đăng ký
                    </Button>
                  </Link>
                  <Link to='/register' style={{ fontSize: 17, color: '#FFF', marginTop: '30px' }}>Quay lại</Link>
                </Col>
              </Row>
            </div>
          </Col>

        </Row>
      </body>
    </div>
  )
}

