import React from 'react'
import { Button, Col, Flex, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import i18next from "../../i18n/i18n"
// import { Link, useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;


export default function ChangePass() {
  let navigate = useNavigate();
  return (
    <div style={{ background: '#1D1D1D', width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: 800, color: '#F24E1E', padding: 50 }}>OrangeC</Text>
        <Link to='/profile' style={{ fontSize: 17, fontWeight: 800, color: '#FFF', padding: 50 }}>Quay lại</Link>
      </div>

      <div>
        <div style={{ padding: 80 }}>
          <div name="form">
            <Row justify='center'>
              <Col span={12} style={{ alignItems: 'center' }}>
                <img src='./images/Hello.svg' style={{ height: '500px', width: '100%' }}></img>
              </Col>

              <Col span={12} style={{ alignItems: 'center' }}>
                <Title style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800', fontSize: '24px' }}>Đổi mật khẩu</Title>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <input name='password' type='text' placeholder='Mật khẩu cũ' style={{ backgroundColor: '#2E2E2E', width: '60%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>
                  <input name='newpassword' type='text' placeholder='Mật khẩu mới' style={{ backgroundColor: '#2E2E2E', width: '60%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>
                  <input name='reppassword' type='text' placeholder='Nhập lại mật khẩu mới' style={{ backgroundColor: '#2E2E2E', width: '60%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>


                </div>



                <Row justify='center'  >
                  <Col span={12} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Link to='/profile'>
                      <Button style={{ width: '470px', height: '60px', fontSize: '24px', fontWeight: '800px', color: '#FFFFFF', backgroundColor: '#F24E1E', borderColor: '#F24E1E', marginTop: '50px', fontWeight: '600' }}>
                        Xác nhận
                      </Button>
                    </Link>


                  </Col>
                </Row>


              </Col>

            </Row>
          </div>

        </div>
      </div>
    </div>
  )
}

