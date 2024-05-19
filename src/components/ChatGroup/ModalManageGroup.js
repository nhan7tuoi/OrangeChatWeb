import React, { useEffect, useRef, useState } from "react";
import "../../css/Modal.css"; // File CSS cho modal
import { IoIosSearch } from "react-icons/io";
import { Button, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import connectSocket from "../../server/ConnectSocket";
import i18next from "../../i18n/i18n";
import {
  addMember,
  removeMember,
  setCoversation,
  setMembers,
} from "../../redux/conversationSlice";
import { formatOneConversation } from "../../utils/formatOneConverstation";

import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";

const { Text } = Typography;

function ModalManageGroup({ isOpen, toggleModal }) {
  const conversation1 = JSON.parse(localStorage.getItem("conversation1"));
  const [optionVisible, setOptionVisible] = useState(false);
  const [temp, setTemp] = useState([]);
  const scrollRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const resultSearch = useSelector((state) => state.friend.resultSearch);
  const mem = useRef({}).current;

  useEffect(() => {
    connectSocket.on("updateConversation", (data) => {
      const temp = formatOneConversation({
        conversation: data,
        userId: user._id,
      });
      dispatch(setCoversation(temp));
    });

    connectSocket.on("removeMember", (data) => {
      if (data.members.some((m) => m._id === user._id)) {
        const temp = formatOneConversation({
          conversation: data,
          userId: user._id,
        });
        dispatch(setCoversation(temp));
      }
    });
    connectSocket.on("leaveGroup", (data) => {
      if (data.members.some((m) => m._id === user._id)) {
        const temp = formatOneConversation({
          conversation: data,
          userId: user._id,
        });
        dispatch(setCoversation(temp));
      }
    });
  }, []);
  const handleGrantAdmin = () => {
    connectSocket.emit("grant admin", {
      conversation: conversation1,
      member: mem.current,
    });
    setOptionVisible(false);
  };
  const handleRevokeAdmin = () => {
    connectSocket.emit("revoke admin", {
      conversation: conversation1,
      member: mem.current,
    });
    setOptionVisible(false);
  };
  const handleRemoveMember = () => {
    try {
      if (!connectSocket.on) {
        console.error("Socket is not connected");
        return; // Không thực hiện gửi emit nếu socket không được kết nối
      }

      if (!conversation1 || !mem.current) {
        console.error("Conversation or member data is missing");
        return; // Không thực hiện gửi emit nếu thiếu dữ liệu conversation hoặc member
      }

      connectSocket.emit("remove member", {
        conversation: conversation1,
        member: mem.current,
      });
      setOptionVisible(!optionVisible);
    } catch (error) {
      console.error("Error handling remove member:", error);
      // Xử lí lỗi nếu có
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" style={{}}>
          <div className="modal" style={{ backgroundColor: "#242424" }}>
            <div
              className="modal-content"
              style={{
                width: "500px",
                height: "600px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "20px",
                }}
              >
                Thành viên
              </Text>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#36373A",
                  paddingLeft: "10px",
                  width: "450px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                <IoIosSearch style={{ fontSize: "18", color: "#FFF" }} />
                <input
                  type="text"
                  placeholder={i18next.t("nhapSoDienThoaiHoacTen")}
                  onChange={(evt) => setKeyword(evt.target.value)}
                  style={{
                    width: "100%",
                    height: "40px",
                    background: "#36373A",
                    marginLeft: "5px",
                    border: "hidden",
                    outline: "none",
                    color: "#FFF",
                    borderRadius: "10px",
                  }}
                ></input>
              </div>
              <div style={{ width: "100%", height: "380px" }}>
                <div
                  ref={scrollRef}
                  style={{
                    overflowY: "auto",
                    background: "#242424",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {Array.isArray(conversation1.members) &&
                    conversation1.members.map((user, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          width: "90%",
                          background: "#242424",
                          padding: "5px",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                          marginLeft: "25px",
                          border: "2px solid #2E2E2E",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={user.image}
                            style={{
                              height: "30px",
                              width: "30px",
                              borderRadius: "50%",
                              marginLeft: "5px",
                            }}
                            alt="image"
                          ></img>
                          <Text
                            style={{
                              marginLeft: "20px",
                              color: "white",
                              fontSize: "16px",
                            }}
                          >
                            {user.name}
                          </Text>
                        </div>
                        <div style={{ display: "flex" }}>
                          <Button
                            style={{
                              display: "flex",
                              width: "40px",
                              height: "40px",
                              background: "#36373A",
                              borderRadius: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "hidden",
                            }}
                            onClick={() => {
                              console.log(user);
                              mem.current = user;
                              handleRemoveMember();
                            }}
                          >
                            <MdOutlinePersonRemoveAlt1
                              style={{ fontSize: "40", color: "#FFF" }}
                            />
                          </Button>

                          <Button
                            style={{
                              display: "flex",
                              width: "40px",
                              height: "40px",
                              background: "#FF6347",
                              borderRadius: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "hidden",
                              marginLeft: "5px",
                            }}
                            onClick={() => {
                              mem.current = user;
                              handleGrantAdmin();
                            }}
                          >
                            <GrUserAdmin
                              style={{ fontSize: "40", color: "#FFF" }}
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>

                <div
                  style={{
                    width: "470px",
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
          </div>
        </div>
      )}
    </>
  );
}

export default ModalManageGroup;
