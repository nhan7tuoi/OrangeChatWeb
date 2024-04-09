import { Col, Row, Typography, Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { FaRegSquarePlus, FaUserLarge } from "react-icons/fa6";
import { HiBell } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { FaSmile, FaFile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { useLocation } from 'react-router-dom';
import conversationApi from '../../apis/conversationApi';
import connectSocket from '../../server/ConnectSocket';
import { useSelector, useDispatch } from 'react-redux';
import { setConversations } from '../../redux/conversationSlice';
import messageApi from '../../apis/messageApi';

const { Text, Title } = Typography;

export default function ChatWindow() {
    const location = useLocation();

    const friend = useSelector((state) => state.current.userId);
    const user = useSelector((state) => state.auth.user);
    const userId = user._id;
    const scrollRef = useRef(null);
    // console.log("user: ", userId);
    // console.log("friend: ", friend);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [showReactionIndex, setShowReactionIndex] = useState(-1);
    const [hasPerformedAction, setHasPerformedAction] = useState(false);
    const [itemSelected, setItemSelected] = useState({});

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
        // console.log("conver:", friend.conversationId);
        // console.log("response: ", response.data);
    }

    useEffect(() => {
        // Lấy phần tử div bên trong
        const scrollElement = scrollRef.current;
        // Nếu có phần tử và đã có tin nhắn mới, cuộn xuống dưới cùng của phần tử
        if (scrollElement && messages.length > 0) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }, [messages]);



    ///reaction
    const toggleReaction = (index) => {
        if (showReactionIndex === index) {
            setShowReactionIndex(-1); // Nếu ô message đã hiển thị reaction thì ẩn reaction đi
        } else {
            setShowReactionIndex(index); // Nếu người dùng click vào ô message mới, cập nhật index của ô message và hiển thị reaction
        }
    };

    // Tải xuống và mở file
    // const downloadAndOpenFile = async (fileUrl) => {
    //     try {
    //         const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    //         const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    //         const options = {
    //             fromUrl: fileUrl,
    //             toFile: localFilePath,
    //         };

    //         const download = RNFS.downloadFile(options);
    //         download.promise.then(response => {
    //             if (response.statusCode === 200) {
    //                 // Mở tệp sau khi tải xuống hoàn tất
    //                 FileViewer.open(localFilePath, { showOpenWithDialog: true })
    //                     .then(() => console.log('File opened successfully'))
    //                     .catch(error => console.error('Error opening file:', error));
    //             } else {
    //                 alert('Download failed', `Failed to download ${fileName}`);
    //             }
    //         }).catch(error => console.error('Error downloading file:', error));
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };



    //upadate message
    // useEffect(() => {
    //     connectSocket.on('chat message', (msg) => {
    //         console.log('new message', msg);
    //         setMessages(preMessage => [...preMessage, msg]);
    //     });
    //     connectSocket.on('reaction message', (reaction) => {
    //         console.log('reaction message', reaction.messageId, reaction.reactType);
    //         const newMessages = messages.map((message) => {
    //             if (message._id === reaction.messageId) {
    //                 message.reaction = [{ type: reactType }];
    //             }
    //             console.log('mes' + message);
    //             return message;
    //         });

    //         // setMessages(newMessages);
    //     });
    // }, []);

    //get conversation
    // const getConversation = async () => {
    //     try {
    //         const response = await conversationApi.getConversation({ userId: user._id });

    //         if (response) {
    //             console.log('update');
    //             dispatch(setConversations(response.data));
    //         }
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // };

    // console.log("Message: ", messages);


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

                        <div style={{ width: '100%', height: '680px' }}>
                            <div ref={scrollRef} style={{ overflowY: 'auto', background: '#1B1B1B', width: '100%', height: '100%' }}>
                                {/* Render message */}
                                {messages.map((item, index) => {
                                    // console.log("item: ", item);
                                    if (item.type === "first") {
                                        return (
                                            <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: "#FFF", fontSize: "16px", fontWeight: '700', textAlign: 'center', width: '100%' }}>Chào mừng bạn đến với OrangeC - Nơi gắn kết bạn bè online</Text>
                                            </div>
                                        )
                                    }
                                    if (item.type === "text") {
                                        return (
                                            <div key={index} style={
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
                                                        {item.contentMessage}
                                                    </Text>
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
                                                    {/* <Button
                                                        onClick={() => {
                                                            toggleReaction(item._id)
                                                        }}
                                                        style={
                                                            item?.senderId === userId
                                                                ? {
                                                                    position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: "gray", justifyContent: 'center', alignItems: 'center',
                                                                    left: 5, bottom: -5
                                                                } : {
                                                                    position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center',
                                                                    right: 5, bottom: -5
                                                                }
                                                        }
                                                    >

                                                    </Button> */}
                                                </Button>
                                            </div>
                                        )
                                    }
                                    if (item.type === "image" && item.isDeleted === false) {
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
                                                }
                                            >
                                                {item?.senderId !== userId && (
                                                    <src source={friend.receiverImage}
                                                        style={{ width: 32, height: 32, borderRadius: 16 }}
                                                    />
                                                )}

                                                <img src={item.urlType} alt="Hình ảnh" style={{ maxWidth: '50%', height: '100%', borderRadius: '10px', margin: '10px' }} />
                                            </div>
                                        )
                                    }
                                    if (item.type === "file" && item.isDeleted === false) {
                                        return (
                                            <div
                                                key={index}
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
                                                    style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', padding: 5 }}
                                                >
                                                    <Button
                                                        style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                                    >
                                                        <div
                                                            style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}
                                                        >
                                                            <FaFile style={{ fontSize: '35', margin: '10', color: '#F24E1E' }} />
                                                        </div>
                                                        <Button
                                                            // onClick={() => {
                                                            //     downloadAndOpenFile(item.urlType[0]);
                                                            // }}
                                                            style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}
                                                        >
                                                            <Text numberOfLines={3} style={{ fontSize: 14, textDecorationLine: 'underline', color: '#FFF', fontWeight: 'bold' }}>{item.fileName}</Text>
                                                        </Button>

                                                    </Button>

                                                </div>

                                            </div>
                                        )


                                    }
                                    if (item.type === "video" && item.isDeleted === false) {
                                        return (
                                            <div
                                                key={index}
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

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FaFile style={{ fontSize: '35', margin: '10', color: '#F24E1E' }} />
                            <BsImage style={{ fontSize: '40', margin: '10', color: '#F24E1E' }} />
                            <div style={{ display: 'flex', background: '#36373A', borderRadius: '25px', justifyContent: 'space-between', alignaItems: 'center', width: '100%', margin: '10px' }}>
                                <input type='text' placeholder='Nhập tin nhắn' style={{ background: '#36373A', border: 'hidden', fontSize: '18px', outline: 'none', marginLeft: '20px', color: '#FFF' }}></input>
                                <FaSmile style={{ fontSize: '30', margin: '10', color: '#F24E1E' }} />
                            </div>
                            <BiSolidLike style={{ fontSize: '50', margin: '10', color: '#F24E1E' }} />
                            <MdSend style={{ fontSize: '50', margin: '10', color: '#F24E1E' }} />
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
