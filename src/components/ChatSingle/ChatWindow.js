import { Col, Row, Typography, Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { FaRegSquarePlus, FaUserLarge } from "react-icons/fa6";
import { HiBell } from "react-icons/hi";
import { MdSend, MdDelete } from "react-icons/md";
import { FaSmile, FaFile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import conversationApi from '../../apis/conversationApi';
import connectSocket from '../../server/ConnectSocket';
import { useSelector, useDispatch } from 'react-redux';
import { setConversations } from '../../redux/conversationSlice';
import messageApi from '../../apis/messageApi';
import '../../css/chatWindow.css';
import { IoMdMore } from "react-icons/io";
import { TbMessageCircleX } from "react-icons/tb";
import { RiShareForwardFill } from "react-icons/ri";
import 'emoji-mart/../emoji-mart';
import { Picker } from 'emoji-mart';
import ForwardModal from './ForwardModal';


const { Text } = Typography;

export default function ChatWindow() {

    const friend = useSelector((state) => state.current.userId);
    const user = useSelector((state) => state.auth.user);
    const userId = user._id;
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [itemSelected, setItemSelected] = useState({});
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileImageRef = useRef(null);
    const fileRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState('');
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [isShowReCall, setIsShowReCall] = useState(false);
    const [showForwardModal, setShowForwardModal] = useState(false);

    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US", options);
    };

    useEffect(() => {
        getLastMessage();
        console.log("fetch message");
    }, [friend])

    const getLastMessage = async () => {
        const response = await messageApi.getMessage({ conversationId: friend.conversationId });
        if (response) {
            setMessages(response.data);
        }
    }

    useEffect(() => {
        // Lấy phần tử div bên trong
        const scrollElement = scrollRef.current;
        // Nếu có phần tử và đã có tin nhắn mới, cuộn xuống dưới cùng của phần tử
        if (scrollElement && messages.length > 0) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }, [messages]);

    // Xử lý tin nhắn gửi lên
    //- set tin nhắn
    const handleInputText = (text) => {
        setInputMessage(text);
    };
    //- gửi tin nhắn lên Socket
    const sendMessage = (message) => {
        connectSocket.emit('chat message', message);
        getConversation();
    };
    //- gửi tin nhắn TEXT
    const onSend = () => {

        if (!inputMessage.trim()) {
            return;
        }
        const newMessage = {
            conversationId: friend.conversationId,
            senderId: userId,
            receiverId: friend.receiverId,
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
        setInputMessage('');
        sendMessage(newMessage);

        // setMessages(preMessage => [...preMessage, newMessage]);

    };

    const handleImageChange = async (event) => {
        const files = event.target.files;
        console.log("files: ", files);
        const selectedImages = [];

        try {
            const formData = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append('image', file);
                // formDataArray.push(formData); // Thêm formData vào mảng

                try {
                    const uploadResponse = await messageApi.uploadImage(formData);
                    const imageUrl = uploadResponse.data;
                    selectedImages.push(imageUrl);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }

            const newMessages = {
                conversationId: friend.conversationId,
                senderId: userId,
                receiverId: friend.receiverId,
                type: 'image',
                urlType: selectedImages, // Có thể bạn muốn chỉ gửi imageUrl
                createAt: new Date(),
                isDeleted: false,
                reaction: [],
                isSeen: false,
                isReceive: false,
                isSend: false,
            };
            console.log("Chat image: ", newMessages);

            // setMessages(prevMessages => [...prevMessages, ...newMessages]);
            sendMessage(newMessages);
            // console.log("con:", friend.conversationId);
        } catch (error) {
            console.error('Error processing images:', error);
        }
    };

    const onSelectFile = async (event) => {
        try {
            const file = event.target.files[0]; // Lấy tệp từ sự kiện
            console.log("file: ", file);
            const formData = new FormData();
            formData.append('image', file);
            console.log(formData.getAll('image'));

            const fileUrl = await messageApi.uploadFile(formData);
            const newMessage = {
                conversationId: friend.conversationId,
                senderId: userId,
                receiverId: friend.receiverId,
                type: "file",
                urlType: fileUrl.data,
                createAt: new Date(),
                isDeleted: false,
                reaction: [],
                isSeen: false,
                isReceive: false,
                isSend: false,
                typeFile: file.type,
                fileName: file.name
            };
            // setMessages([...messages, newMessage]);
            sendMessage(newMessage);
            console.log("file message: ", newMessage);
        } catch (err) {
            console.log('Lỗi khi chọn tệp: ' + err);
        }
    };

    //- show recall
    const showReCall = isShowReCall => {
        setIsShowReCall(isShowReCall);
    };

    // Thu hồi tin nhắn
    const recallMessage = (messageId) => {
        console.log('recall message', itemSelected);
        // hidePressOther()
        connectSocket.emit('recall message', { messageId: messageId, conversationId: friend.conversationId });
        getConversation();
    };

    const deleteMessage = messageId => {
        console.log('delete message', itemSelected);
        // hidePressOther();
        connectSocket.emit('delete message', {
            messageId: messageId,
            conversationId: friend.conversationId,
            userDelete: user._id,
        });
        getConversation();
    };

    //get conversation
    const getConversation = async () => {
        try {
            const response = await conversationApi.getConversation({ userId: user._id });

            if (response) {
                console.log('update');
                dispatch(setConversations(response.data));
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    // Update data từ Socket gửi về
    useEffect(() => {
        connectSocket.on('chat message', (msg) => {
            if (msg.conversationId === friend.conversationId) {
                console.log('new message', msg);
                setMessages(preMessage => [...preMessage, msg]);
            }
        });
        connectSocket.on('reaction message', async (reaction) => {
            console.log('reaction message', reaction.messageId, reaction.reactType);
            const newMessages = messages.map((message) => {
                if (message._id === reaction.messageId) {
                    message.reaction = [{ type: reaction.reactType }];
                }
                return message;
            });
            getLastMessage();
        });
        connectSocket.on('recall message', (msg) => {
            console.log('recall message', msg);
            if (msg.conversationId === friend.conversationId) {
                const newMessages = messages.map((message) => {
                    if (message._id === msg.messageId) {
                        message.isRecall = true;
                    }
                    return message;
                });
                getLastMessage();
            }
        });
        connectSocket.on('delete message', msg => {
            console.log('delete message', msg);
            if (msg.conversationId === friend.conversationId) {
              const newMessages = messages.map(message => {
                if (message._id === msg.messageId) {
                  message.deleteBy = [{userDelete: msg.userDelete}];
                }
                return message;
              });
              getLastMessage();
            }
          });
    }, []);

    const handleImageClick = () => {
        fileImageRef.current.click(); // Kích hoạt input file khi button được nhấn
        // console.log("fileInput: ", fileInputRef.current);
    };

    const handleFileClick = () => {
        fileRef.current.click(); // Kích hoạt input file khi button được nhấn
        // console.log("fileInput: ", fileInputRef.current);
    };

    const handleEmojiSelect = emoji => {
        setSelectedEmoji(emoji.native);
        togglePicker();
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const MessageWithIcons = ({ itemSelected }) => {
        const [showIcons, setShowIcons] = useState(false);

        const toggleIcons = () => {
            setShowIcons(prevShowIcons => !prevShowIcons);
        };
        
        const toggleForwardModal = () => {
            setShowForwardModal(prevState => !prevState);
        };

        const handleActionClick = (action) => {
            action(itemSelected.messageId);
            setShowIcons(false);
        };

        const handleForward = (friendId) => {
            // Xử lý việc chuyển tiếp tin nhắn tới bạn bè có id là friendId
            console.log("Forward message to friend:", friendId);
            toggleForwardModal(); // Đóng modal sau khi chuyển tiếp
        };

        return (
            <div className="message" id="message-1" style={{ display: 'flex', alignItems: 'center' }}>
                <IoMdMore style={{ fontSize: '20px', color: '#F24E1E', cursor: 'pointer' }} onClick={() => {
                    toggleIcons();
                    setItemSelected(itemSelected);
                }} />
                <div className="icons" style={{ display: showIcons ? 'block' : 'none' }}>
                    {itemSelected?.senderId === userId && ( // Chỉ hiển thị khi là tin nhắn của người dùng hiện tại
                        <Button style={{ background: 'transparent' }} onClick={() => {
                        //     if (itemSelected?.senderId === userId) {
                        //     showReCall(!isShowReCall);
                        //     console.log("Check1: ", itemSelected?.senderId);
                        //     console.log("Check2: ", userId);
                        // }
                        handleActionClick(() => recallMessage(itemSelected._id))
                        }}>
                            <TbMessageCircleX style={{ fontSize: '20px', color: '#F24E1E' }} />
                        </Button>
                    )}
                    <Button style={{ background: 'transparent' }} onClick={() => handleActionClick(() => deleteMessage(itemSelected._id))}>
                        <MdDelete style={{ fontSize: '20px', color: '#F24E1E' }} />
                    </Button>
                    <Button style={{ background: 'transparent' }} onClick={() => {
                        toggleForwardModal();
                        // handleActionClick(() => recallMessage(itemSelected._id))
                    }}>
                        <RiShareForwardFill style={{ fontSize: '20px', color: '#F24E1E' }} />
                    </Button>
                </div>
                {showForwardModal && (
                // Modal danh sách bạn bè
                <ForwardModal
                    onClose={toggleForwardModal}
                    onForward={handleForward}
                    userId={userId}
                />
            )}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100%' }}>


            <Row style={{ height: '100%', width: '100%' }}>
                <Col span={18}>
                    <div style={{ borderColor: '#2E2E2E', border: '1px solid #2E2E2E', width: '100%', height: '100%' }}>
                        <div style={{ display: 'flex', margin: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: "65px", height: "7vh", position: "relative" }}>
                                    <img src={friend.receiverImage} style={{ width: "100%", height: "100%", borderRadius: '100%' }} />
                                    <div style={{ position: "absolute", width: "10px", height: "10px", backgroundColor: "#F24E1E", borderRadius: "100%", bottom: 0, right: 10, borderColor: '#FFF', border: '1px solid #FFF' }}></div>
                                </div>

                                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: '20px', fontWeight: '800px', color: '#FFF', width: '100%' }}>{friend.receiverName}</Text>
                                    <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666', width: '100%' }}>Đang hoạt động</Text>
                                </div>
                            </div>
                            <div>
                                <IoSearchSharp style={{ fontSize: '20', margin: '10', color: '#FFF' }} />
                                <LuPhone style={{ fontSize: '20', margin: '10', color: '#FFF' }} />
                                <BsCameraVideo style={{ fontSize: '20', margin: '10', color: '#FFF' }} />
                                <FaRegSquarePlus style={{ fontSize: '20', margin: '10', color: '#FFF' }} />
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '640px' }}
                        >
                            <div ref={scrollRef} style={{ overflowY: 'auto', background: '#1B1B1B', width: '100%', height: '100%' }}>
                                {/* Render message */}
                                {messages.map((item, index) => {
                                    // console.log("item: ", item);
                                    if (item.type === "first") {
                                        return (
                                            <div key={index} style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: "#FFF", fontSize: "16px", fontWeight: '700', textAlign: 'center', width: '100%' }}>Chào mừng bạn đến với OrangeC - Nơi gắn kết bạn bè online</Text>
                                            </div>
                                        )
                                    }
                                    if (item.type === 'text' &&
                                        (item.deleteBy?.length == 0 ||
                                            item.deleteBy?.find(f => f !== user._id))) {
                                        return (
                                            <div key={index}
                                                style={
                                                    item?.senderId === userId ?
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-end',
                                                            justifyContent: 'flex-end'
                                                        } :
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'flex-start'
                                                        }

                                                }>
                                                {item?.senderId !== userId && (
                                                    <img src={friend.receiverImage}
                                                        style={{ width: '32px', height: '32px', borderRadius: '16px' }}
                                                    />
                                                )}
                                                <Button
                                                    style={
                                                        {
                                                            backgroundColor: "#F24E1E",
                                                            maxWidth: '60%',
                                                            padding: '2px',
                                                            borderRadius: '10px',
                                                            margin: '10px',
                                                            minWidth: '10%',
                                                            border: 'hidden'
                                                        }
                                                    }>
                                                    <Text style={{
                                                        fontSize: '14px',
                                                        padding: '3px',
                                                        color: "#FFF",
                                                        fontWeight: '600'
                                                    }}>
                                                        {item.isReCall === true ? 'Đã thu hồi' : item.contentMessage}
                                                    </Text>
                                                    {item.isReCall === false && (
                                                        <Text style={
                                                            item?.senderId === userId ? {
                                                                textAlign: 'right',
                                                                fontSize: '12px',
                                                                padding: '2px'
                                                            } : {
                                                                textAlign: "left",
                                                                fontSize: '12px',
                                                                padding: '2px'
                                                            }
                                                        }>
                                                            {formatTime(item.createAt)}
                                                        </Text>
                                                    )}
                                                </Button>
                                                <MessageWithIcons itemSelected={item} />

                                            </div>
                                        )
                                    }
                                    if (item.type === "image") {
                                        return (
                                            <div key={index}
                                                setItemSelected={setItemSelected}
                                                showReCall={showReCall}
                                                isShowReCall={isShowReCall}
                                                style={
                                                    item?.senderId === userId ?
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-end',
                                                            justifyContent: 'flex-end'
                                                        } :
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'flex-start'
                                                        }
                                                }
                                            >
                                                {item?.senderId !== userId && (
                                                    <src source={friend.receiverImage}
                                                        style={{ width: 32, height: 32, borderRadius: 16 }}
                                                    />
                                                )}

                                                <img src={item.urlType} alt="Hình ảnh" style={{ maxWidth: '50%', height: '100%', borderRadius: '10px', margin: '10px' }} />
                                                <MessageWithIcons key={messages._id} messageId={messages._id} conversationId={messages.conversationId} />
                                            </div>
                                        )
                                    }
                                    if (item.type === "file") {
                                        return (
                                            <div
                                                key={index}
                                                setItemSelected={setItemSelected}
                                                showReCall={showReCall}
                                                isShowReCall={isShowReCall}
                                                style={
                                                    item?.senderId === userId ?
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-end',
                                                            justifyContent: 'flex-end'
                                                        } :
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'flex-start'
                                                        }
                                                }
                                            >
                                                {item?.senderId !== userId && (
                                                    <src source={friend.receiverImage}
                                                        style={{ width: 32, height: 32, borderRadius: 16 }}
                                                    />
                                                )}
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        // flexWrap: 'wrap',
                                                        // justifyContent: 'flex-start',
                                                        // alignItems: 'flex-start',
                                                        padding: 5,
                                                        width: '20%',
                                                        height: '50px'
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            window.open(item.urlType, '_blank')
                                                        }}
                                                        style={{
                                                            flexDirection: 'row',
                                                            // alignItems: 'center',
                                                            width: '100%',
                                                            height: '100%'
                                                        }}
                                                    >
                                                        <div
                                                        // style={{
                                                        //     justifyContent: 'center',
                                                        //     alignItems: 'center'
                                                        // }}
                                                        >
                                                            <FaFile style={{
                                                                fontSize: '35',
                                                                color: '#F24E1E'
                                                            }} />

                                                            <Text style={{
                                                                fontSize: 14,
                                                                // textDecorationLine: 'underline',
                                                                color: 'red',
                                                                fontWeight: '700',
                                                                whiteSpace: 'pre-wrap'
                                                            }}>
                                                                {item.fileName}</Text>
                                                        </div>


                                                    </Button>

                                                </div>
                                                <MessageWithIcons key={messages._id} messageId={messages._id} conversationId={messages.conversationId} />
                                            </div>
                                        )


                                    }
                                    if (item.type === "video") {
                                        return (
                                            <div
                                                key={index}
                                                setItemSelected={setItemSelected}
                                                showReCall={showReCall}
                                                isShowReCall={isShowReCall}
                                                style={
                                                    item?.senderId === userId ?
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-end',
                                                            justifyContent: 'flex-end'
                                                        } :
                                                        {
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            paddingLeft: '10px',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'flex-start'
                                                        }
                                                }
                                            >
                                                {item?.senderId !== userId && (
                                                    <src source={friend.receiverImage}
                                                        style={{ width: 32, height: 32, borderRadius: 16 }}
                                                    />
                                                )}
                                                <video src={item.urlType[0]}
                                                    controls
                                                    muted
                                                    style={{ maxWidth: '50%', height: '100%', borderRadius: '10px', margin: '10px' }}
                                                />

                                            </div>
                                        )


                                    }
                                })}

                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', borderColor: '#2E2E2E', border: '1px solid #2E2E2E' }}>
                            <div>
                                <input
                                    type="file"
                                    onChange={onSelectFile}
                                    ref={fileRef}
                                    style={{ display: 'none' }} // Ẩn input file
                                    accept="*/*"
                                />
                                <Button
                                    onClick={handleFileClick}
                                    style={{
                                        display: 'flex',
                                        margin: '5px',
                                        background: '#242424',
                                        border: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <FaFile style={{ fontSize: '30px', color: '#F24E1E' }} />
                                </Button>
                            </div>

                            <div>
                                <input
                                    type="file"
                                    multiple
                                    ref={fileImageRef}
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }} // Ẩn input file
                                    accept="image/*,video/*" // Chấp nhận cả ảnh và video
                                />
                                <Button
                                    onClick={handleImageClick}
                                    style={{
                                        display: 'flex',
                                        marginLeft: '5px',
                                        background: '#242424',
                                        border: 'hidden',
                                        justifyContent: 'center', // Thêm để căn giữa icon trong button
                                        alignItems: 'center' // Thêm để căn giữa icon trong button
                                    }}
                                >
                                    <BsImage style={{ fontSize: '30px', color: '#F24E1E' }} />
                                </Button>
                            </div>
                        </div>

                        <div style=
                            {{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                // height: '5%'
                            }}
                        >


                            <div style=
                                {{
                                    display: 'flex',
                                    background: '#36373A',
                                    borderRadius: '25px',
                                    justifyContent: 'space-between',
                                    alignaItems: 'center',
                                    width: '100%',
                                    margin: '10px',
                                    height: '100%'
                                }}
                            >
                                <input
                                    value={inputMessage}
                                    onChange={(e) => handleInputText(e.target.value)}
                                    type='text' placeholder='Nhập tin nhắn' style={{
                                        background: '#36373A',
                                        border: 'hidden',
                                        fontSize: '18px',
                                        outline: 'none',
                                        marginLeft: '20px',
                                        color: '#FFF',
                                        width: '90%'
                                    }}
                                />

                                <Button
                                    style={{
                                        display: 'flex',
                                        // marginLeft: '5px',
                                        background: '#36373A',
                                        border: 'hidden',
                                        justifyContent: 'flex-end', // Thêm để căn giữa icon trong button
                                        alignItems: 'center', // Thêm để căn giữa icon trong button
                                        width: '5%',
                                        borderRadius: '25px'
                                    }}
                                // onClick={()=> {togglePicker()}}
                                >
                                    <FaSmile style={{ fontSize: '30px', color: '#F24E1E' }} />
                                    {/* {showPicker && <Picker onSelect={handleEmojiSelect} />} */}
                                </Button>

                            </div>
                            <BiSolidLike style={{ fontSize: '50', margin: '10', color: '#F24E1E' }} />

                            <Button style={{ display: 'flex', marginLeft: '10px', background: '#242424', border: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                                onClick={() => {
                                    onSend()
                                }}
                            >
                                <MdSend style={{ fontSize: '40', color: '#F24E1E' }} />
                            </Button>
                        </div>
                    </div>

                </Col>

                <Col span={6} style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', height: '45%', borderColor: '#2E2E2E', border: '1px solid #2E2E2E' }}>
                        <img src={friend.receiverImage} style={{ width: "150px", height: "150px", borderRadius: '100%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            <Text style={{ fontSize: '20px', fontWeight: '800px', color: '#FFF', width: '100%' }}>
                                {friend.receiverName}
                            </Text>
                            <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#F24E1E', width: '100%' }}>Đang hoạt động</Text>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                            <div style={{ display: 'flex', width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <HiBell style={{ fontSize: '30', color: '#FFF' }} />
                            </div>

                            <div style={{ display: 'flex', width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <FaUserLarge style={{ fontSize: '25', color: '#FFF' }} />
                            </div>


                        </div>
                    </div>

                    <div style={{ paddingLeft: '5px', borderColor: '#2E2E2E', border: '1px solid #2E2E2E', height: '55vh', padding: '20px' }}>
                        <Text style={{ color: '#FFF', fontSize: '20px', fontWeight: '700' }}>File, phương tiện và liên kết</Text>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
