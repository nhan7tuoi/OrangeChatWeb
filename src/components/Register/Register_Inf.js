import React, { useState } from 'react'
import { Button, Col, DatePicker, Row, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authApi from '../../apis/authApi';
import { Formik } from 'formik';
import i18next from '../../i18n/i18n';
import * as Yup from 'yup';


const { Text, Title } = Typography;

export default function Register() {
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const location  = useLocation();

  // Lấy dữ liệu từ state
  const values = location.state?.values;

  // console.log(values);
  const [valuesRegister, setValuesRegister] = useState(values);
  console.log(values);


  const handleSendCode = async (x) => {
    const username = valuesRegister.email;
    console.log(valuesRegister);
    try {
      const response = await authApi.verifycation({ username: username });
      console.log('response', response);
      navigate('/registerverifi', {state : {
        valuesRegister: valuesRegister,
        code: response.data.code,
        valueInfo: x,
        dateOfBirth: date
      }});
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div style={{ background: '#1D1D1D', width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: 800, color: '#F24E1E', padding: 50 }}>OrangeC</Text>
        <Link to='/' style={{ fontSize: 17, fontWeight: 800, color: '#FFF', padding: 50 }}>Đăng nhập</Link>
      </div>

      <div>
        <div style={{ padding: 80 }}>
          <div name="form">
            <Row justify='center'>
              <Col span={14} style={{ alignItems: 'center' }}>
                <img src='./images/Hello.svg' style={{ height: '600px', width: '100%' }}></img>
              </Col>

              <Col span={8} style={{ alignItems: 'center' }}>
                <Title style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800', fontSize: '24px' }}>Thông tin cá nhân</Title>

                <Formik
                  initialValues={{ fullName: '', gender: 'male' }}
                  validationSchema={Yup.object({
                    fullName: Yup.string().required(i18next.t('khongDuocBoTrong')),
                  })}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    console.log('values', values);
                    handleSendCode(values);
                    console.log(date);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <div style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div className='full-name' style={{ width: '100%' }}>
                          <input name='fullname' type='text' placeholder='Tên tài khoản' style={{ backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}
                            onChange={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                            error={errors.fullName && touched.fullName}
                          />

                          {errors.fullName && touched.fullName && <Text style={{ color: '#FFF', fontSize: 12 }}>{errors.fullName}</Text>}
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                          <Button onClick={() => setOpen(true)}
                            style={{
                              width: '30%',
                              height: '50px',
                              backgroundColor: "red",
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '10px'
                            }} >
                            <Text style={{ color: '#FFF', fontSize: 12 }}>{i18next.t('chonNgaySinh')}</Text>
                          </Button>
                          <DatePicker
                            style={{ width: '70%' }}
                            format="DD/MM/YYYY"
                            mode='date'
                            modal
                            open={open}
                            date={date}
                            onChange={(date) => {
                              setOpen(false)
                              setDate(date)
                              console.log('Choose date', date["$d"]);
                            }}
                            onCancel={() => {
                              setOpen(false)
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', marginTop: 30, justifyContent: 'center', width: '200px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', alignItems: 'start' }}
                          onChange={(newValue) => handleChange('gender')(newValue)}
                          value={values.gender}>
                          <div>
                            <input type='radio' name='gender' value="male"></input>
                            <Text style={{ color: '#FFFFFF59' }}>Nam</Text>
                          </div>

                          <div>
                            <input type='radio' name='gender' value="female"></input>
                            <Text style={{ color: '#FFFFFF59' }}>Nữ</Text>
                          </div>
                        </div>
                      </div>

                      <Row justify='center'  >
                        <Col span={12} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                          <Button
                            disabled={!isValid}
                            onClick={handleSubmit}
                            style={
                              isValid ? {
                                width: '440px', height: '60px', fontSize: '24px', fontWeight: '800px', color: '#FFFFFF', backgroundColor: '#F24E1E', borderColor: '#F24E1E', marginTop: '150px', fontWeight: '600'
                              } : {
                                width: '440px', height: '60px', fontSize: '24px', fontWeight: '800px', color: '#FFFFFF', backgroundColor: 'gray', borderColor: '#F24E1E', marginTop: '150px', fontWeight: '600'
                              }
                            }>
                            Tiếp tục
                          </Button>
                          <div style={{ fontSize: 17, color: '#FFF', marginTop: '30px' }} onClick={() => navigate(-1)}>Quay lại</div>

                        </Col>
                      </Row>
                    </div>
                  )}
                </Formik>






              </Col>

            </Row>
          </div>

        </div>
      </div>
    </div>
  )
}

