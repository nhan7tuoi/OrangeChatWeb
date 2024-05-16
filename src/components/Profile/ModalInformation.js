import "../../css/Modal.css"; // File CSS cho modal

import { Button, Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";

const { Text, Title } = Typography;

function ModalAddMemberGroup({ isOpen, toggleModal }) {
  const user = useSelector((state) => state.auth.user);
  const dateOfBirth = new Date(user.dateOfBirth);

  // Trích xuất ngày, tháng và năm
  const day = dateOfBirth.getDate();
  const month = dateOfBirth.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
  const year = dateOfBirth.getFullYear();

  // Định dạng lại thành ngày tháng năm
  const formattedDateOfBirth = `${day}/${month}/${year}`;

  console.log(formattedDateOfBirth);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" style={{ backgroundColor: "#242424" }}>
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
                  //   span={10}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    // border: "1px solid #2E2E2E",
                    width: "100%",
                  }}
                >
                  <img
                    src={user.image}
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "100%",
                    }}
                    alt="avatar"
                  ></img>
                  <input
                  type="file"
                  multiple
                  // ref={fileImageRef}
                  // onChange={handleImageChange}
                  // style={{ display: "none" }} // Ẩn input file
                  accept="image/*"
                />
                </Col>

                <Col
                  style={{
                    // border: "1px solid #2E2E2E",
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
                  <body style={{ width: "100%" }}>
                    <div
                      className="username"
                      style={{
                        width: "100%",
                      }}
                    >
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
                        value={user.name}
                        name="username"
                        type="text"
                        style={{
                          backgroundColor: "#2E2E2E",
                          width: "70%",
                          height: "40px",
                          borderRadius: "10px",
                          // marginTop: "10px",
                          fontSize: "18px",
                          padding: "15px",
                          color: "#FFF",
                        }}

                        // label={i18next.t('nhapSoDienThoai')}
                        // onChange={handleChange("phoneNumber")}
                        // onBlur={handleBlur("phoneNumber")}
                        // value={values.phoneNumber}
                        // error={errors.phoneNumber && touched.phoneNumber}
                      />

                      {/* {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={{ color: "#FFF", fontSize: 12 }}>
                          {errors.phoneNumber}
                        </Text>
                      )} */}
                    </div>

                    <div className="dateofbirth" style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          //   width: "50%",
                          marginRight: "30px",
                        }}
                      >
                        Ngày sinh:
                      </Text>
                      <input
                        value={formattedDateOfBirth}
                        name="dateofbirth"
                        type="text"
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

                        // label={i18next.t('nhapSoDienThoai')}
                        // onChange={handleChange("phoneNumber")}
                        // onBlur={handleBlur("phoneNumber")}
                        // value={values.phoneNumber}
                        // error={errors.phoneNumber && touched.phoneNumber}
                      />

                      {/* {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={{ color: "#FFF", fontSize: 12 }}>
                          {errors.phoneNumber}
                        </Text>
                      )} */}
                    </div>

                    {/* <div
                      style={{
                        display: "flex",
                        // justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          //   width: "20%",
                        }}
                      >
                        Giới tính:
                      </Text>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          width: "50%",
                        }}
                      >
                        {user.gender ? "Nam" : "Nữ"}
                      </Text>
                    </div> */}

                    <div
                      style={{
                        display: "flex",
                        // marginTop: '10px',
                        justifyContent: "center",
                        width: "200px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          // justifyContent: "space-between",
                          width: "200px",
                          // alignItems: "start",
                        }}
                        // onChange={(newValue) =>
                        //   handleChange("gender")(newValue)
                        // }
                        // value={values.gender}
                      >
                        <Text
                          style={{
                            fontSize: "20px",
                            color: "#FFF",
                            //   width: "20%",
                            marginRight: "40px",
                            marginTop: "15px",
                          }}
                        >
                          Giới tính:
                        </Text>

                        <div style={{ display: "flex", flexDirection: "row"}}>
                          <div style={{ marginTop: "20px" }}>
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={user.gender === "male"}
                            />
                            <Text style={{ color: "#FFF", fontSize: '18px' }}>Nam</Text>
                          </div>

                          <div style={{ marginTop: "20px" }}>
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={user.gender === "female"}
                            ></input>
                            <Text style={{ color: "#FFF", fontSize: '18px' }}>Nữ</Text>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="phoneNumber" style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          //   width: "50%",
                        }}
                      >
                        Số điện thoại:
                      </Text>
                      <input
                        value={user.phone}
                        name="phoneNumber"
                        type="tel"
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

                        // label={i18next.t('nhapSoDienThoai')}
                        // onChange={handleChange("phoneNumber")}
                        // onBlur={handleBlur("phoneNumber")}
                        // value={values.phoneNumber}
                        // error={errors.phoneNumber && touched.phoneNumber}
                      />

                      {/* {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={{ color: "#FFF", fontSize: 12 }}>
                          {errors.phoneNumber}
                        </Text>
                      )} */}
                    </div>

                    <div className="email" style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: "20px",
                          color: "#FFF",
                          // width: "30%",
                          marginRight: "70px",
                        }}
                      >
                        Email:
                      </Text>
                      <input
                        value={user.email}
                        name="email"
                        type="email"
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

                        // label={i18next.t('nhapSoDienThoai')}
                        // onChange={handleChange("phoneNumber")}
                        // onBlur={handleBlur("phoneNumber")}
                        // value={values.phoneNumber}
                        // error={errors.phoneNumber && touched.phoneNumber}
                      />

                      {/* {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={{ color: "#FFF", fontSize: 12 }}>
                          {errors.phoneNumber}
                        </Text>
                      )} */}
                    </div>
                  </body>
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
                onClick={toggleModal}
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

export default ModalAddMemberGroup;
