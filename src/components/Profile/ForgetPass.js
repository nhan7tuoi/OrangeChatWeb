import React, { useEffect, useState } from 'react'
import { Button, Col, Flex, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import i18next from "../../i18n/i18n"
import authApi from '../../apis/authApi';
// import { Link, useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;


export default function ForgetPass() {
  const [email, setEmail] = useState('');
  const [isSend, setIsSend] = useState(false);

  //đúng định dạng email thì mới bấm dc nút gửi
  useEffect(() => {
    if (email.includes('@') && email.includes('.com')) {
      setIsSend(true);
    } else {
      setIsSend(false);
    }
  }, [email]);

  useEffect(() => {
    if (email.includes('@') && email.includes('.com')) {
      setIsSend(true);
    } else {
      setIsSend(false);
    }
  }, [email]);

  const handleForgotPassword = async () => {
    try {
      const response = await authApi.forgotPassword({
        username: email
      });
      if (response.message === 'ok') {
        alert(i18next.t('daGuiEmail'));
        navigate('/');
      } else {
        alert(i18next.t('emailChuaDangKy'));

      }
    } catch (error) {
      console.log('error', error);
    }
  }

  let navigate = useNavigate();
  return (
    <div style={{ background: '#1D1D1D', width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: 800, color: '#F24E1E', padding: 50 }}>OrangeC</Text>
        <Link to='/' style={{ fontSize: 17, fontWeight: 800, color: '#FFF', padding: 50 }}>Quay lại</Link>
      </div>

      <div>
        <div style={{ padding: 80 }}>
          <div name="form">
            <Row justify='center'>
              <Col span={12} style={{ alignItems: 'center' }}>
                <img src='./images/Hello.svg' style={{ height: '500px', width: '100%' }}></img>
              </Col>

              <Col span={12} style={{ alignItems: 'center' }}>
                <Title style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800', fontSize: '24px' }}>Quên mật khẩu</Title>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <input name='email' type='text' placeholder='Email' style={{ backgroundColor: '#2E2E2E', width: '60%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>


                </div>



                <Row justify='center'  >
                  <Col span={12} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <Button style={
                      isSend ? {
                        // alignSelf: 'center',
                        width: "200px",
                        height: "60px",
                        backgroundColor: "#F24E1E",
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                      } : {
                        alignSelf: 'center',
                        width: 200,
                        height: 60,
                        backgroundColor: "gray",
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                      }
                    }
                      onClick={() => {
                        handleForgotPassword();
                      }}
                      disabled={!isSend}
                    >
                      Gửi
                    </Button>



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

