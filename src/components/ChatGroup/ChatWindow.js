import { Col, Row, Typography, Button, Alert } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { FaRegSquarePlus, FaUserLarge } from "react-icons/fa6";
import { HiBell } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { FaSmile, FaFile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import conversationApi from "../../apis/conversationApi";
import connectSocket from "../../server/ConnectSocket";
import { useSelector, useDispatch } from "react-redux";
import {
  setConversations,
  setCoversation,
} from "../../redux/conversationSlice";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import messageApi from "../../apis/messageApi";
import "../../css/chatWindow.css";
import { IoMdMore } from "react-icons/io";
import { TbMessageCircleX } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { MdOutlineGroups3 } from "react-icons/md";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

import ModalManageGroup from "./ModalManageGroup";
import ModalAddMemberGroup from "./ModalAddMemberGroup";
import i18next from "../../i18n/i18n";
import { formatOneConversation } from "../../utils/formatOneConverstation";
import ForwardModal from "../ChatSingle/ForwardModal";
import currentSlice, { setCurrentPage } from "../../redux/currentSlice";

const { Text } = Typography;

export default function ChatWindow() {
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);
  const [isOpenManageGroup, setIsOpenManageGroup] = useState(false);
  const [isShowReCall, setIsShowReCall] = useState(false);
  const toggleAddMemberModal = () => {
    setIsOpenAddMember(!isOpenAddMember);
  };

  const toggleManageGroupModal = () => {
    setIsOpenManageGroup(!isOpenManageGroup);
  };
  // const group = useSelector((state) => state.current.userId);
  // const friend = group.groupChat;
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;

  const conversation = useSelector((state) => state.conversation.conversation);
  // console.log("conversation: ", conversation);

  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const fileImageRef = useRef(null);
  const fileRef = useRef(null);

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  useEffect(() => {
    getLastMessage();
    console.log("fetch message");
  }, [conversation]);

  const getLastMessage = async () => {
    const response = await messageApi.getMessage({
      conversationId: conversation.lastMessage?.conversationId,
    });
    if (response) {
      setMessages(response.data);
    }
  };

  const handleInputText = (text) => {
    setInputMessage(text);
  };
  //- gửi tin nhắn lên Socket
  const sendMessage = (message) => {
    connectSocket.emit("chat message", message);
    getConversation();
  };
  //- gửi tin nhắn TEXT
  const onSend = () => {
    if (!inputMessage.trim()) {
      return;
    }
    const newMessage = {
      conversationId: conversation._id,
      senderId: userId,
      receiverId: conversation.members,
      type: "text",
      contentMessage: inputMessage,
      urlType: "",
      createAt: new Date(),
      isDeleted: false,
      reaction: [],
      isSeen: false,
      isReceive: false,
      isSend: false,
      isRecall: false,
    };
    console.log("Chat text: ", newMessage);
    setInputMessage("");
    sendMessage(newMessage);
  };

  //

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected file: ", file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      let uploadResponse = await messageApi.uploadImage(formData);

      console.log("File Type: ", file.type);

      const mediaUrl = uploadResponse;
      console.log("Uploaded media URL: ", mediaUrl);

      if (mediaUrl) {
        const newMessage = {
          conversationId: conversation._id,
          senderId: userId,
          receiverId: conversation.members,
          type: file.type.startsWith("image/") ? "image" : "video",
          urlType: mediaUrl.data,
          createAt: new Date(),
          isDeleted: false,
          reaction: [],
          isSeen: false,
          isReceive: false,
          isSend: false,
        };
        console.log("Chat media message: ", newMessage);
        if (mediaUrl !== null) {
          sendMessage(newMessage);
        }
      } else {
        console.log("No media URL returned, message not sent.");
      }
    } catch (error) {
      console.error("Error processing media:", error);
    }
  };

  const onSelectFile = async (event) => {
    try {
      const file = event.target.files[0]; // Lấy tệp từ sự kiện
      console.log("file: ", file);
      const formData = new FormData();
      formData.append("image", file);
      console.log("Get all: ", formData.getAll("image"));

      const fileUrl = await messageApi.uploadFile(formData);
      console.log("File URL: ", fileUrl);
      const newMessage = {
        conversationId: conversation._id,
        senderId: userId,
        receiverId: conversation.members,
        type: "file",
        urlType: fileUrl.data,
        createAt: new Date(),
        isDeleted: false,
        reaction: [],
        isSeen: false,
        isReceive: false,
        isSend: false,
        typeFile: file.type,
        fileName: file.name,
      };
      sendMessage(newMessage);
      console.log("file message: ", newMessage);
    } catch (err) {
      console.log("Lỗi khi chọn tệp: " + err);
    }
  };

  //- show recall
  const showReCall = (isShowReCall) => {
    setIsShowReCall(isShowReCall);
  };

  // Thu hồi tin nhắn
  const recallMessage = (messageId) => {
    console.log("recall message", itemSelected);
    connectSocket.emit("recall message", {
      messageId: messageId,
      conversationId: conversation._id,
    });
    getConversation();
  };

  const deleteMessage = (messageId) => {
    console.log("deleting", itemSelected);
    connectSocket.emit("delete message", {
      messageId: messageId,
      conversationId: conversation._id,
      userDelete: user._id,
    });
    getConversation();
  };

  //get conversation
  const getConversation = async () => {
    try {
      const response = await conversationApi.getConversation({
        userId: user._id,
      });

      if (response) {
        console.log("update");
        dispatch(setConversations(response.data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Update data từ Socket gửi về
  useEffect(() => {
    connectSocket.on("chat message", (msg) => {
      if (msg.conversationId === conversation._id) {
        console.log("new message", msg);
        setMessages((preMessage) => [...preMessage, msg]);
      }
    });
    connectSocket.on("reaction message", async (reaction) => {
      console.log("reaction message", reaction.messageId, reaction.reactType);
      const newMessages = messages.map((message) => {
        if (message._id === reaction.messageId) {
          message.reaction = [{ type: reaction.reactType }];
        }
        return message;
      });
      getLastMessage();
    });
    connectSocket.on("recall message", (msg) => {
      console.log("recall message", msg);
      if (msg.conversationId === conversation._id) {
        const newMessages = messages?.map((message) => {
          if (message._id === msg.messageId) {
            message.isRecall = true;
          }
          return message;
        });
        getLastMessage();
      }
    });
    connectSocket.on("delete message", (msg) => {
      console.log("delete message", msg);
      if (msg.conversationId === conversation._id) {
        const newMessages = messages.map((message) => {
          if (message._id === msg.messageId) {
            message.deleteBy = [{ userDelete: msg.userDelete }];
          }
          return message;
        });
        getLastMessage();
      }
    });
    connectSocket.on("removeMember", (data) => {
      console.log("conId", conversation._id);
      console.log("dataid", data._id);
      console.log(conversation._id === data._id);
      if (
        !data.members.some((m) => m._id === user._id) &&
        conversation._id === data._id
      ) {
        dispatch(setCurrentPage("ChatWelcome"));
      }
    });

    connectSocket.on("leaveGroup", (data) => {
      console.log("conId", conversation._id);
      console.log("dataid", data._id);
      console.log(conversation._id === data._id);
      if (
        !data.members.some((m) => m._id === user._id) &&
        conversation._id === data._id
      ) {
      }
    });
  }, []);

  const handleImageClick = () => {
    fileImageRef.current.click(); // Kích hoạt input file khi button được nhấn
    // console.log("fileInput: ", fileImageRef.current);
  };

  const handleFileClick = () => {
    fileRef.current.click(); // Kích hoạt input file khi button được nhấn
    // console.log("fileInput: ", fileInputRef.current);
  };

  const MessageWithIcons = ({ itemSelected }) => {
    const [showIcons, setShowIcons] = useState(false);

    const toggleIcons = () => {
      setShowIcons((prevShowIcons) => !prevShowIcons);
    };

    const handleActionClick = (action) => {
      action(itemSelected.messageId);
      setShowIcons(false);
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleForwardModal = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div
        className="message"
        id="message-1"
        style={{ display: "flex", alignItems: "center" }}
      >
        <IoMdMore
          style={{ fontSize: "20px", color: "#F24E1E", cursor: "pointer" }}
          onClick={() => {
            toggleIcons();
            setItemSelected(itemSelected);
          }}
        />
        <div
          className="icons"
          style={{ display: showIcons ? "block" : "none" }}
        >
          {itemSelected?.senderId._id === userId && (
            <Button
              style={{ background: "transparent" }}
              onClick={() => {
                handleActionClick(() => recallMessage(itemSelected._id));
              }}
            >
              <TbMessageCircleX
                style={{ fontSize: "20px", color: "#F24E1E" }}
              />
            </Button>
          )}
          <Button
            style={{ background: "transparent" }}
            onClick={() =>
              handleActionClick(() => deleteMessage(itemSelected._id))
            }
          >
            <MdDelete style={{ fontSize: "20px", color: "#F24E1E" }} />
          </Button>
          <Button
            style={{ background: "transparent" }}
            onClick={() => {
              toggleForwardModal();
            }}
          >
            <RiShareForwardFill
              style={{ fontSize: "20px", color: "#F24E1E" }}
            />
          </Button>
        </div>
        <ForwardModal isOpen={isOpen} toggleForwardModal={toggleForwardModal} />
      </div>
    );
  };

  useEffect(() => {
    // connectSocket.on("updateConversation", (data) => {
    //   const temp = formatOneConversation({
    //     conversation: data,
    //     userId: user._id,
    //   });
    //   dispatch(setCoversation(temp));
    // });

    connectSocket.on("removeMember", (data) => {
      if (data.members.some((m) => m._id === user._id)) {
        const temp = formatOneConversation({
          conversation: data,
          userId: user._id,
        });
        dispatch(setCoversation(temp));
        console.log("vvvvv", conversation);
      }
    });
  }, []);

  const handleLeave = () => {
    if (
      conversation.administrators?.length > 1 ||
      !conversation.administrators?.includes(user._id)
    ) {
      if (
        (window.confirm(i18next.t("thongBao") + "\n" + i18next.t("xacNhanRoi")),
        dispatch(setCurrentPage("ChatWelcome")))
      ) {
        connectSocket.emit("remove member", {
          conversation: conversation,
          member: user,
        });
      }
    } else {
      if (
        window.confirm(i18next.t("thongBao") + "\n" + i18next.t("dieuKienRoi"))
      ) {
      }
    }
  };
  const handleDisband = () => {
    // Hiển thị cửa sổ xác nhận giải tán nhóm
    if (window.confirm(i18next.t("xacNhanGiaiTan"))) {
      // Gửi yêu cầu giải tán nhóm đến server
      connectSocket.emit("disband the group", conversation);
    }
  };

  const [inputEmoji, setInputEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    // setInputEmoji(e => e + emojiObject.emoji);
    // // setShowPicker(false);
    // console.log("emoji: ", emojiObject.emoji);
    setInputMessage(inputMessage + emojiObject.emoji);
  };

  const handleShowPicker = () => {
    setShowPicker((show) => !show);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100%",
      }}
    >
      <Row style={{ height: "100%", width: "100%" }}>
        <Col span={18}>
          <div
            style={{
              borderColor: "#2E2E2E",
              border: "1px solid #2E2E2E",
              width: "100%",
              height: "90vh",
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "20px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{ width: "65px", height: "7vh", position: "relative" }}
                >
                  <img
                    src={conversation?.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#F24E1E",
                      borderRadius: "100%",
                      bottom: 0,
                      right: 10,
                      borderColor: "#FFF",
                      border: "1px solid #FFF",
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "800px",
                      color: "#FFF",
                      width: "100%",
                    }}
                  >
                    {conversation.nameGroup}
                  </Text>
                </div>
              </div>
              <div>
                <IoSearchSharp
                  style={{ fontSize: "20", margin: "10", color: "#FFF" }}
                />
                <LuPhone
                  style={{ fontSize: "20", margin: "10", color: "#FFF" }}
                />
                <BsCameraVideo
                  style={{ fontSize: "20", margin: "10", color: "#FFF" }}
                />
                <FaRegSquarePlus
                  style={{ fontSize: "20", margin: "10", color: "#FFF" }}
                />
              </div>
            </div>

            <div style={{ width: "100%", height: "640px" }}>
              <div
                ref={scrollRef}
                style={{
                  overflowY: "auto",
                  background: "#1B1B1B",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Render message */}
                {messages?.map((item, index) => {
                  // console.log("item: ", item);
                  if (item.type === "first") {
                    return (
                      <div
                        key={index}
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFF",
                            fontSize: "16px",
                            fontWeight: "700",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          Chào mừng bạn đến với OrangeC - Nơi gắn kết bạn bè
                          online
                        </Text>
                      </div>
                    );
                  }
                  if (
                    item.type === "text" &&
                    (item.deleteBy?.length == 0 ||
                      item.deleteBy?.find((f) => f !== user._id))
                  ) {
                    return (
                      <div
                        key={index}
                        style={
                          item?.senderId._id === userId
                            ? {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                              }
                            : {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }
                        }
                      >
                        {item?.senderId._id !== userId && (
                          <img
                            src={item.senderId.image}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "16px",
                            }}
                          />
                        )}
                        <Button
                          style={{
                            backgroundColor: "#F24E1E",
                            maxWidth: "60%",
                            padding: "2px",
                            borderRadius: "10px",
                            margin: "10px",
                            minWidth: "10%",
                            border: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "14px",
                              padding: "3px",
                              color: "#FFF",
                              fontWeight: "600",
                            }}
                          >
                            {item.isReCall === true
                              ? "Đã thu hồi"
                              : item.contentMessage}
                          </Text>
                          {item.isReCall === false && (
                            <Text
                              style={
                                item?.senderId === userId
                                  ? {
                                      textAlign: "right",
                                      fontSize: "12px",
                                      padding: "2px",
                                    }
                                  : {
                                      textAlign: "left",
                                      fontSize: "12px",
                                      padding: "2px",
                                    }
                              }
                            >
                              {formatTime(item.createAt)}
                            </Text>
                          )}
                        </Button>
                        <MessageWithIcons itemSelected={item} />
                      </div>
                    );
                  }
                  if (
                    item.type === "image" &&
                    (item.deleteBy?.length == 0 ||
                      item.deleteBy?.find((f) => f !== user._id))
                  ) {
                    return (
                      <div
                        key={index}
                        setItemSelected={setItemSelected}
                        showReCall={showReCall}
                        isShowReCall={isShowReCall}
                        style={
                          item?.senderId._id === userId
                            ? {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                              }
                            : {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }
                        }
                      >
                        {item?.senderId !== userId && (
                          <src
                            source={item.senderId.image}
                            style={{ width: 32, height: 32, borderRadius: 16 }}
                          />
                        )}

                        {item.isReCall === false ? (
                          <Button
                              style={
                                  {
                                      backgroundColor: "#F24E1E",
                                      maxWidth: '30%',
                                      height: '40%',
                                      padding: '2px',
                                      borderRadius: '10px',
                                      margin: '10px',
                                      minWidth: '10%',
                                      border: 'hidden',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                  }
                              }
                          >
                          <img
                            src={item.urlType[0]}
                            alt="Hình ảnh"
                            style={{
                              maxWidth: "95%",
                              height: "95%",
                              borderRadius: "10px",
                              // margin: "10px",
                              minWidth: "10%",
                            }}
                          />
                          </Button>
                        ) : (
                          

                          <Button
                            style={{
                              backgroundColor: "#F24E1E",
                              maxWidth: "60%",
                              padding: "2px",
                              borderRadius: "10px",
                              margin: "10px",
                              minWidth: "10%",
                              border: "hidden",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "14px",
                                padding: "3px",
                                color: "#FFF",
                                fontWeight: "600",
                              }}
                            >
                              Đã thu hồi
                            </Text>
                          </Button>
                        )}
                        <MessageWithIcons itemSelected={item} />
                      </div>
                    );
                  }
                  if (
                    item.type === "file" &&
                    (item.deleteBy?.length == 0 ||
                      item.deleteBy?.find((f) => f !== user._id))
                  ) {
                    return (
                      <div
                        key={index}
                        setItemSelected={setItemSelected}
                        showReCall={showReCall}
                        isShowReCall={isShowReCall}
                        style={
                          item?.senderId._id === userId
                            ? {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                              }
                            : {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }
                        }
                      >
                        {item?.senderId._id !== userId && (
                          <src
                            source={conversation.receiverImage}
                            style={{ width: 32, height: 32, borderRadius: 16 }}
                          />
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: 5,
                            maxWidth: "30%",
                            maxHeight: "20%",
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.isReCall === false ? (
                            <Button
                              onClick={() => {
                                window.open(item.urlType, "_blank");
                              }}
                              style={{
                                flexDirection: "row",
                                width: '100%',
                                height: '100%',
                                backgroundColor: "#F24E1E",
                                border: 'hidden'
                              }}
                            >
                              {item.isReCall === false ? (
                                <div
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  <FaFile
                                    style={{
                                      fontSize: "35",
                                      color: "#FFF",
                                    }}
                                  />

                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: "#36373A",
                                      fontWeight: "700",
                                      whiteSpace: 'pre-wrap'
                                    }}
                                  >
                                    {item.fileName}
                                  </Text>
                                </div>
                              ) : (
                                <Button
                                  style={{
                                    backgroundColor: "#F24E1E",
                                    maxWidth: "60%",
                                    padding: "2px",
                                    borderRadius: "10px",
                                    margin: "10px",
                                    minWidth: "10%",
                                    border: "hidden",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: "14px",
                                      padding: "3px",
                                      color: "#FFF",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Đã thu hồi
                                  </Text>
                                </Button>
                              )}
                            </Button>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "#F24E1E",
                                width: "100%",
                                padding: "2px",
                                borderRadius: "10px",
                                margin: "10px",
                                border: "hidden",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: "14px",
                                  padding: "3px",
                                  color: "#FFF",
                                  fontWeight: "600",
                                }}
                              >
                                Đã thu hồi
                              </Text>
                            </Button>
                          )}
                        </div>
                        <MessageWithIcons itemSelected={item} />
                      </div>
                    );
                  }
                  if (
                    item.type === "video" &&
                    (item.deleteBy?.length == 0 ||
                      item.deleteBy?.find((f) => f !== user._id))
                  ) {
                    return (
                      <div
                        key={index}
                        setItemSelected={setItemSelected}
                        showReCall={showReCall}
                        isShowReCall={isShowReCall}
                        style={
                          item?.senderId._id === userId
                            ? {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                              }
                            : {
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "10px",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }
                        }
                      >
                        {item?.senderId._id !== userId && (
                          <src
                            source={conversation.receiverImage}
                            style={{ width: 32, height: 32, borderRadius: 16 }}
                          />
                        )}
                        {item.isReCall === false ? (
                          <Button
                            style={{
                              backgroundColor: "#F24E1E",
                              maxWidth: "30%",
                              height: "40%",
                              padding: "2px",
                              borderRadius: "10px",
                              margin: "10px",
                              minWidth: "10%",
                              border: "hidden",
                            }}
                          >
                            <video
                              src={item.urlType[0]}
                              controls
                              muted
                              style={{
                                maxWidth: "95%",
                                maxHeight: "95%",
                                borderRadius: "10px",
                                // margin: "10px",
                                backgroundColor: "#F24E1E",
                              }}
                            />
                          </Button>
                        ) : (
                          <Button
                            style={{
                              //   backgroundColor: "#F24E1E",
                              //   maxWidth: "60%",
                              padding: "2px",
                              borderRadius: "10px",
                              margin: "10px",
                              //   minWidth: "10%",
                              border: "hidden",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "14px",
                                padding: "3px",
                                color: "#FFF",
                                fontWeight: "600",
                              }}
                            >
                              Đã thu hồi
                            </Text>
                          </Button>
                        )}
                        <MessageWithIcons itemSelected={item} />
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderColor: "#2E2E2E",
                border: "1px solid #2E2E2E",
              }}
            >
              <div>
                <input
                  type="file"
                  onChange={onSelectFile}
                  ref={fileRef}
                  style={{ display: "none" }} // Ẩn input file
                  accept="*/*"
                />
                <Button
                  onClick={handleFileClick}
                  style={{
                    display: "flex",
                    margin: "5px",
                    background: "#242424",
                    border: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaFile style={{ fontSize: "30px", color: "#F24E1E" }} />
                </Button>
              </div>

              <div>
                <input
                  type="file"
                  multiple
                  ref={fileImageRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }} // Ẩn input file
                  accept="image/*,video/*" // Chấp nhận cả ảnh và video
                />
                <Button
                  onClick={handleImageClick}
                  style={{
                    display: "flex",
                    marginLeft: "5px",
                    background: "#242424",
                    border: "hidden",
                    justifyContent: "center", // Thêm để căn giữa icon trong button
                    alignItems: "center", // Thêm để căn giữa icon trong button
                  }}
                >
                  <BsImage style={{ fontSize: "30px", color: "#F24E1E" }} />
                </Button>
              </div>

              <Button
                style={{
                  display: "flex",
                  background: "#242424",
                  border: "hidden",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                onClick={() => {
                  handleShowPicker();
                }}
              >
                <FaSmile style={{ fontSize: "30px", color: "#F24E1E" }} />
                {showPicker && (
                  <EmojiPicker
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      left: "20px",
                    }}
                    onEmojiClick={handleEmojiClick}
                  />
                )}
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "#36373A",
                  borderRadius: "25px",
                  justifyContent: "space-between",
                  alignaItems: "center",
                  width: "100%",
                  margin: "10px",
                  height: "50px",
                }}
              >
                <input
                  value={inputMessage}
                  // value={inputEmoji}
                  onChange={(e) => {
                    handleInputText(e.target.value);

                    setInputEmoji(e.target.value);
                  }}
                  type="text"
                  placeholder="Nhập tin nhắn"
                  style={{
                    background: "#36373A",
                    border: "hidden",
                    fontSize: "18px",
                    outline: "none",
                    marginLeft: "20px",
                    color: "#FFF",
                    width: "100%",
                    borderRadius: "25px",
                  }}
                />
              </div>
              <BiSolidLike
                style={{ fontSize: "50", margin: "10", color: "#F24E1E" }}
              />

              <Button
                style={{
                  display: "flex",
                  marginLeft: "10px",
                  background: "#242424",
                  border: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  onSend();
                }}
              >
                <MdSend style={{ fontSize: "40", color: "#F24E1E" }} />
              </Button>
            </div>
          </div>
        </Col>

        <Col
          span={6}
          style={{ display: "flex", flexDirection: "column", height: "90vh" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              borderColor: "#2E2E2E",
              border: "1px solid #2E2E2E",
            }}
          >
            <img
              src={conversation.image}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "100%",
                marginTop: "30px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: "800px",
                  color: "#FFF",
                  width: "100%",
                  marginTop: "20px",
                  fontWeight: "600",
                }}
              >
                {conversation.nameGroup}
              </Text>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <Button
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                  marginTop: "30px",
                  background: "none",
                  border: "none",
                  height: "50px",
                }}
                onClick={toggleAddMemberModal}
              >
                <AiOutlineUsergroupAdd
                  style={{ fontSize: 24, color: "#FFF", margin: "10px" }}
                />
                <Text style={{ color: "#FFF", fontSize: "18px" }}>
                  Thêm thành viên
                </Text>
              </Button>
              <ModalAddMemberGroup
                isOpen={isOpenAddMember}
                toggleModal={toggleAddMemberModal}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                  marginTop: "0px",
                  background: "none",
                  border: "none",
                  height: "50px",
                }}
                onClick={toggleManageGroupModal}
              >
                <MdOutlineGroups3
                  style={{ fontSize: 24, color: "#FFF", margin: "10px" }}
                />
                <Text style={{ color: "#FFF", fontSize: "18px" }}>
                  Thành viên
                </Text>
              </Button>
              <ModalManageGroup
                isOpen={isOpenManageGroup}
                toggleModal={toggleManageGroupModal}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                  marginTop: "10px",
                  background: "none",
                  border: "none",
                  height: "50px",
                }}
                onClick={() => {
                  if (conversation.administrators.find((m) => m === user._id)) {
                    handleDisband();
                  }
                }}
              >
                <MdOutlineCloseFullscreen
                  style={{ fontSize: 24, color: "#FFF", margin: "10px" }}
                />
                <Text style={{ color: "#FFF", fontSize: "18px" }}>
                  Giải tán nhóm
                </Text>
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  height: "50px",
                  marginTop: "10px",
                }}
                onClick={() => {
                  handleLeave();
                }}
              >
                <CiLogout
                  style={{ fontSize: 24, color: "#FFF", margin: "10px" }}
                />
                <Text style={{ color: "#FFF", fontSize: "18px" }}>
                  Rời nhóm
                </Text>
              </Button>
            </div>
          </div>

          {/* <div
            style={{
              paddingLeft: "5px",
              borderColor: "#2E2E2E",
              border: "1px solid #2E2E2E",
              height: "20%",
              padding: "20%",
            }}
          >
            <Text
              style={{ color: "#FFF", fontSize: "20px", fontWeight: "700" }}
            >
              File, phương tiện và liên kết
            </Text>
          </div> */}
        </Col>
      </Row>
    </div>
  );
}
