import { Button, Col, Row, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { setUser } from "../../redux/authSlice"; 
import authApi from "../../apis/authApi"; 

const { Text, Title } = Typography;

function ModalInformation({ isOpen, toggleModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().substring(0, 10) : '');
      setGender(user.gender || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      setImage(user.image || '');
    }
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await authApi.editProfile({
        userId: user._id,
        name,
        dateOfBirth,
        gender,
        phone,
        email,
        image
      });
      if (response.message === 'ok') {
        alert('Sửa thông tin thành công');
        dispatch(setUser(response.user));
        toggleModal();
      } else {
        alert('Sửa thông tin thất bại');
      }
    } catch (error) {
      console.error('Error editing profile:', error);
    }
  };

  if (!user) {
    return null; // or render a loading spinner
  }

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div
            className="modal"
            style={{ backgroundColor: "#242424" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{
                width: "400px",
                height: "600px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row style={{ background: "#242424" }}>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <img
                    src={image}
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "100%",
                    }}
                    alt="avatar"
                  />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Col>

                <Col
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <header>
                    <Title
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#FFF",
                        padding: "10px",
                      }}
                    >
                      Thông tin cá nhân
                    </Title>
                  </header>
                  <div style={{ width: "100%" }}>
                    <div className="username" style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          marginRight: "32px",
                        }}
                      >
                        Họ và tên:
                      </Text>
                      <input
                        value={name}
                        name="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          backgroundColor: "#2E2E2E",
                          width: "70%",
                          height: "40px",
                          borderRadius: "10px",
                          fontSize: "18px",
                          padding: "15px",
                          color: "#FFF",
                        }}
                      />
                    </div>

                    <div className="dateofbirth" style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          marginRight: "30px",
                        }}
                      >
                        Ngày sinh:
                      </Text>
                      <input
                        value={dateOfBirth}
                        name="dateOfBirth"
                        type="date"
                        onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                        style={{
                          backgroundColor: "#2E2E2E",
                          width: "70%",
                          height: "40px",
                          borderRadius: "10px",
                          marginTop: "20px",
                          fontSize: "18px",
                          padding: "15px",
                          color: "#FFF",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "200px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "200px",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "20px",
                            color: "#FFF",
                            marginRight: "40px",
                            marginTop: "15px",
                          }}
                        >
                          Giới tính:
                        </Text>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div style={{ marginTop: "20px" }}>
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={gender === "male"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <Text style={{ color: "#FFF", fontSize: "18px" }}>Nam</Text>
                          </div>

                          <div style={{ marginTop: "20px" }}>
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={gender === "female"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <Text style={{ color: "#FFF", fontSize: "18px" }}>Nữ</Text>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="phoneNumber" style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                        }}
                      >
                        Số điện thoại:
                      </Text>
                      <input
                        value={phone}
                        name="phone"
                        type="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          backgroundColor: "#2E2E2E",
                          width: "70%",
                          height: "40px",
                          borderRadius: "10px",
                          marginTop: "20px",
                          fontSize: "18px",
                          padding: "15px",
                          color: "#FFF",
                        }}
                      />
                    </div>

                    <div className="email" style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          marginRight: "70px",
                        }}
                      >
                        Email:
                      </Text>
                      <input
                        value={email}
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          backgroundColor: "#2E2E2E",
                          width: "70%",
                          height: "40px",
                          borderRadius: "10px",
                          marginTop: "20px",
                          fontSize: "18px",
                          padding: "15px",
                          color: "#FFF",
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                style={{ width: "100px", height: "40px" }}
                onClick={toggleModal}
              >
                <Text>Hủy</Text>
              </Button>

              <Button
                style={{
                  width: "100px",
                  height: "40px",
                  marginLeft: "10px",
                  backgroundColor: "#36373A",
                }}
                onClick={handleSubmit}
              >
                <Text style={{ color: "white" }}>Xong</Text>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalInformation;
