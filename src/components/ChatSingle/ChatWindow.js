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
import ForwardModal from './ForwardModal';
import EmojiPicker from 'emoji-picker-react';


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
    const fileImageRef = useRef(null);
    const fileRef = useRef(null);
    const [isShowReCall, setIsShowReCall] = useState(false);


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
    };

    // 

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        console.log("Selected file: ", file);

        try {
            const formData = new FormData();
            formData.append('file', file);

            let uploadResponse = await messageApi.uploadImage(formData);

            console.log("File Type: ", file.type);

            const mediaUrl = uploadResponse;
            console.log("Uploaded media URL: ", mediaUrl);

            if (mediaUrl) {
                const newMessage = {
                    conversationId: friend.conversationId,
                    senderId: userId,
                    receiverId: friend.receiverId,
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    urlType: mediaUrl,
                    createAt: new Date(),
                    isDeleted: false,
                    reaction: [],
                    isSeen: false,
                    isReceive: false,
                    isSend: false,
                };
                console.log("Chat media message: ", newMessage);

                sendMessage(newMessage);
            } else {
                console.log("No media URL returned, message not sent.");
            }
        } catch (error) {
            console.error('Error processing media:', error);
        }
    };


    const onSelectFile = async (event) => {
        try {
            const file = event.target.files[0]; // Lấy tệp từ sự kiện
            console.log("file: ", file);
            const formData = new FormData();
            formData.append('image', file);
            console.log("Get all: ",formData.getAll('image'));

            const fileUrl = await messageApi.uploadFile(formData);
            console.log("File URL: ", fileUrl);
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
        connectSocket.emit('recall message', { messageId: messageId, conversationId: friend.conversationId });
        getConversation();
    };

    const deleteMessage = messageId => {
        console.log('deleting', itemSelected);
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
                        message.deleteBy = [{ userDelete: msg.userDelete }];
                    }
                    return message;
                });
                getLastMessage();
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
            setShowIcons(prevShowIcons => !prevShowIcons);
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
            <div className="message" id="message-1" style={{ display: 'flex', alignItems: 'center' }}>
                <IoMdMore style={{ fontSize: '20px', color: '#F24E1E', cursor: 'pointer' }} onClick={() => {
                    toggleIcons();
                    setItemSelected(itemSelected);
                }} />
                <div className="icons" style={{ display: showIcons ? 'block' : 'none' }}>
                    {itemSelected?.senderId === userId && (
                        <Button style={{ background: 'transparent' }} onClick={() => {
                            handleActionClick(() => recallMessage(itemSelected._id))
                        }}>
                            <TbMessageCircleX style={{ fontSize: '20px', color: '#F24E1E' }} />
                        </Button>
                    )}
                    <Button style={{ background: 'transparent' }} onClick={() => handleActionClick(() => deleteMessage(itemSelected._id))}>
                        <MdDelete style={{ fontSize: '20px', color: '#F24E1E' }} />
                    </Button>
                    <Button style={{ background: 'transparent' }} onClick={() => {
                        toggleForwardModal()
                    }}>
                        <RiShareForwardFill style={{ fontSize: '20px', color: '#F24E1E' }} />
                    </Button>
                </div>
                <ForwardModal
                    isOpen={isOpen}
                    toggleForwardModal={toggleForwardModal}
                />
            </div>
        );
    };

    const [inputEmoji, setInputEmoji] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiClick = (emojiObject) => {
        setInputEmoji(e => e + emojiObject.emoji);
        // setShowPicker(false);
        console.log("emoji: ", emojiObject.emoji);
    };

    const handleShowPicker = () => {
        setShowPicker(show => !show)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100%' }}>


            <Row style={{ height: '100%', width: '100%' }}>
                <Col span={18}>
                    <div style={{ borderColor: '#2E2E2E', border: '1px solid #2E2E2E', width: '100%', height: '90vh' }}>
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
                                    // console.log("item: ", messages);
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
                                    if (item.type === "image" &&
                                        (item.deleteBy?.length == 0 ||
                                            item.deleteBy?.find(f => f !== user._id))) {
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

                                                {item.isReCall === false ? (
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
                                                        }
                                                    >
                                                        <img src={item.urlType} alt="Hình ảnh" style={{ maxWidth: '50%', height: '100%', borderRadius: '10px', margin: '10px' }} />
                                                    </Button>

                                                ) : (
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
                                                        }
                                                    >
                                                        <Text style={{
                                                            fontSize: '14px',
                                                            padding: '3px',
                                                            color: "#FFF",
                                                            fontWeight: '600'
                                                        }}>
                                                            Đã thu hồi
                                                        </Text>
                                                    </Button>

                                                )
                                                }


                                                <MessageWithIcons itemSelected={item} />
                                            </div>
                                        )
                                    }
                                    if (item.type === "file" &&
                                        (item.deleteBy?.length == 0 ||
                                            item.deleteBy?.find(f => f !== user._id))) {
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
                                                        padding: 5,
                                                        width: '20%',
                                                        height: '50px'
                                                    }}
                                                >
                                                    {item.isReCall === false ? (
                                                        <Button
                                                            onClick={() => {
                                                                window.open(item.urlType, '_blank')
                                                            }}
                                                            style={{
                                                                flexDirection: 'row',
                                                                maxWidth: '40%',
                                                                minWidth: '10%',
                                                                height: '100%'
                                                            }}
                                                        >
                                                            {(item.isReCall === false) ? (
                                                                <div
                                                                    style=
                                                                    {{
                                                                        width: '100%',
                                                                        height: '100%'
                                                                    }}>
                                                                    <FaFile style={{
                                                                        fontSize: '35',
                                                                        color: '#F24E1E'
                                                                    }} />

                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        color: 'red',
                                                                        fontWeight: '700',
                                                                        // whiteSpace: 'pre-wrap'
                                                                    }}>
                                                                        {item.fileName}
                                                                    </Text>
                                                                </div>
                                                            ) : (
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
                                                                    }
                                                                >
                                                                    <Text style={{
                                                                        fontSize: '14px',
                                                                        padding: '3px',
                                                                        color: "#FFF",
                                                                        fontWeight: '600'
                                                                    }}>
                                                                        Đã thu hồi
                                                                    </Text>
                                                                </Button>
                                                            )}
                                                        </Button>
                                                    ) : (
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
                                                            }
                                                        >
                                                            <Text style={{
                                                                fontSize: '14px',
                                                                padding: '3px',
                                                                color: "#FFF",
                                                                fontWeight: '600'
                                                            }}>
                                                                Đã thu hồi
                                                            </Text>
                                                        </Button>
                                                    )}
                                                </div>
                                                <MessageWithIcons itemSelected={item} />
                                            </div>
                                        )


                                    }
                                    if (item.type === "video" &&
                                        (item.deleteBy?.length == 0 ||
                                            item.deleteBy?.find(f => f !== user._id))) {
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
                                                {item.isReCall === false ? (
                                                    <video src={item.urlType[0]}
                                                        controls
                                                        muted
                                                        style={{ maxWidth: '50%', height: '100%', borderRadius: '10px', margin: '10px' }}
                                                    />
                                                ) : (
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
                                                        }
                                                    >
                                                        <Text style={{
                                                            fontSize: '14px',
                                                            padding: '3px',
                                                            color: "#FFF",
                                                            fontWeight: '600'
                                                        }}>
                                                            Đã thu hồi
                                                        </Text>
                                                    </Button>
                                                )}
                                                <MessageWithIcons itemSelected={item} />
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

                            <Button
                                style={{
                                    display: 'flex',
                                    background: '#242424',
                                    border: 'hidden',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}
                                onClick={() => { handleShowPicker() }}
                            >
                                <FaSmile style={{ fontSize: '30px', color: '#F24E1E' }} />
                                {showPicker && <EmojiPicker style={{ position: 'absolute', bottom: '40px', left: '20px' }} onEmojiClick={handleEmojiClick} />}
                            </Button>
                        </div>

                        <div style=
                            {{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
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
                                    height: '50px'
                                }}
                            >
                                <input
                                    value={inputMessage}
                                    // value={inputEmoji}
                                    onChange={e => {
                                        handleInputText(e.target.value)
                                        // setInputEmoji(e.target.value)
                                    }}
                                    type='text' placeholder='Nhập tin nhắn' style={{
                                        background: '#36373A',
                                        border: 'hidden',
                                        fontSize: '18px',
                                        outline: 'none',
                                        marginLeft: '20px',
                                        color: '#FFF',
                                        width: '100%',
                                        borderRadius: '25px'
                                    }}
                                />

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
        </div >
    )
}

const arrgif = [
    {
        id: 1,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/icongif+(1).gif',
    },
    {
        id: 2,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/icongif+(2).gif',
    },
    {
        id: 3,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/icongif+(3).gif',
    },
    {
        id: 4,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/icongif+(4).gif',
    },
    {
        id: 5,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(1).jpg',
    },
    {
        id: 6,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(2).png',
    },
    {
        id: 7,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(3).png',
    },
    {
        id: 8,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(4).png',
    },
    {
        id: 9,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(5).png',
    },
    {
        id: 10,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(6).png',
    },
    {
        id: 11,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(7).png',
    },
    {
        id: 12,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(8).png',
    },
    {
        id: 13,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(9).png',
    },
    {
        id: 14,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(10).png',
    },
    {
        id: 15,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(11).png',
    },
    {
        id: 16,
        url: 'https://uploadfile2002.s3.ap-southeast-1.amazonaws.com/sticker+(12).png',
    },
];
