import React from 'react'
import { Button, Col, Flex, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import i18next from "../../i18n/i18n"

const { Text, Title } = Typography;


export default function Register() {
  let navigate = useNavigate();
  return (
    <div style={{ background: '#1D1D1D', width: '100vw', height: '100vh' }}>

      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: 800, color: '#F24E1E', padding: 50 }}>OrangeC</Text>
        <Link to='/' style={{ fontSize: 17, fontWeight: 800, color: '#FFF', padding: 50 }}>Đăng nhập</Link>
      </header>

      <body style={{ padding: 80 }}>
        <Row justify='center'>
          <Col span={14}>
            <img src='./images/Hello.svg' style={{ height: '600px', width: '100%' }}></img>
          </Col>

          <Col span={8}>
            <Title style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800' }}>Đăng ký</Title>

            <Formik
              initialValues={{ email: '', password: '', repassword: '', phoneNumber: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email(i18next.t('diaChiEmailKhongHopLe')).required(i18next.t('khongDuocBoTrong')),
                password: Yup.string().min(6, i18next.t('matKhauPhaiCoItNhat6KyTu')).required(i18next.t('khongDuocBoTrong')),
                repassword: Yup.string().oneOf([Yup.ref('password'), null], i18next.t('matKhauKhongTrungKhop')).required(i18next.t('khongDuocBoTrong')),
                phoneNumber: Yup.string()
                  .matches(/^(0\d{9}|84\d{9})$/, i18next.t('soDienThoaiKhongHopLe'))
                  .required(i18next.t('khongDuocBoTrong'))
              })}
              validateOnMount={true}
              onSubmit={(values) => {
                console.log(values);
                navigate('/login', {values});
                // navigation.navigate('EnterInfoScreen', { values });
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <input name='phoneNumber' type='tel' placeholder='Số điện thoại' style={{ backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}
                    label={i18next.t('nhapSoDienThoai')}
                    onChange={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    error={errors.phoneNumber && touched.phoneNumber}
                  >

                    {/* {errors.phoneNumber && touched.phoneNumber } */}
                    {/* // <Text>{errors.phoneNumber}</Text>} */}

                  </input>

                  <input name='email' type='email' placeholder='Email' style={{ backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>

                  <input name='password' type='password' placeholder='Mật khẩu' style={{ backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>

                  <input name='confirmPassword' type='password' placeholder='Nhập lại mật khẩu' style={{ backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>

                  <Link to='/registercontinute'>
                    <Button style={{ width: '440px', height: '60px', fontSize: '24px', fontWeight: '800px', color: '#FFFFFF', backgroundColor: '#F24E1E', borderColor: '#F24E1E', marginTop: '80px', fontWeight: '600' }}>
                      Tiếp tục
                    </Button>
                  </Link>
                </div>
              )}
            </Formik>



          </Col>

        </Row>

      </body>
    </div>
  )
}

