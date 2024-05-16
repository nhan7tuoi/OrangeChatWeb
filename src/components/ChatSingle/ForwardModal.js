import React, { useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io';
import i18next from '../../i18n/i18n';
import { Button, Checkbox, Typography } from 'antd';
import '../../css/Modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMembers } from '../../redux/conversationSlice';
import { fetchFriends, setFriends } from '../../redux/friendSilce';
import FriendApi from '../../apis/FriendApi';
import connectSocket from '../../server/ConnectSocket';


const { Text } = Typography;

export default function ForwardModal({ isOpen, toggleForwardModal }) {

    const [keyword, setKeyword] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [itemSelected, setItemSelected] = useState({});

    const [temp, setTemp] = useState([]);
    const scrollRef = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const friend = useSelector((state) => state.current.userId);
    const listFriends = useSelector(state => state.friend.listFriends);

    useEffect(() => {
        if (keyword === '') {
            fetchData();
            dispatch(setMembers([]));
        } else {
            const resultSearch = temp.filter(
                f => f.name.includes(keyword) || f.phone.includes(keyword),
            );
            // console.log(resultSearch);
            dispatch(setFriends(resultSearch));
        }
    }, [keyword]);

    const fetchData = async () => {
        try {
            dispatch(fetchFriends(user._id));
            const friends = await FriendApi.getFriends({ userId: user._id });
            setTemp(friends.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // console.log(keyword);

    const handleCheckboxChange = (member, checked) => {
        if (checked) {
            setSelectedMembers([...selectedMembers, member]);
            // console.log("Checkbox: ", member);
        } else {
            setSelectedMembers(selectedMembers.filter(m => m._id !== member._id));
        }
    };

    const [listConversations, setConversations] = useState([]);

    const forwardMessage = messageId => {
        connectSocket.emit('forward message', {
            messageId: messageId,
            conversationId: friend.conversationId,
            senderId: user._id,
        });
        console.log("ItemSelectedForward: ", itemSelected);
        const updatedList = listConversations.map(c => {
            if (c._id === friend.conversation._id) {
                return { ...c, sentStatus: true };
            }
            return { ...c, sentStatus: false };
        });
        console.log(updatedList);
        setConversations(updatedList);
    };

    const handleShare = () => {
        console.log("Shared with:", selectedMembers);
        forwardMessage();
        toggleForwardModal();
        setSelectedMembers([]);
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay" style={{}}>
                    <div className="modal" style={{ backgroundColor: '#242424' }}>
                        <div className="modal-content" style={{ width: '500px', height: '600px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontSize: '24px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Chia sẻ</Text>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#36373A', paddingLeft: '10px', width: '450px', borderRadius: '8px', marginTop: '10px' }}>
                                <IoIosSearch style={{ fontSize: '18', color: '#FFF' }} />
                                <input type='text' placeholder={i18next.t('nhapSoDienThoaiHoacTen')} onChange={(evt) => setKeyword(evt.target.value)} style={{ width: '100%', height: '40px', background: '#36373A', marginLeft: '5px', border: 'hidden', outline: 'none', color: '#FFF', borderRadius: '10px' }}></input>
                            </div>
                            <div style={{ width: '100%', height: '380px' }}>
                                <div ref={scrollRef} style={{ overflowY: 'auto', background: '#242424', width: '100%', height: '100%' }}>
                                    {Array.isArray(listFriends) && listFriends.map((user, index) => (
                                        <div key={index} style={{ display: 'flex', width: '90%', background: '#242424', padding: '5px', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', marginLeft: '25px', border: '2px solid #2E2E2E', borderRadius: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={user.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginLeft: '5px' }} alt='image'></img>
                                                <Text style={{ marginLeft: '20px', color: 'white', fontSize: '16px' }}>{user.name}</Text>
                                            </div>

                                            <Checkbox onChange={(e) => handleCheckboxChange(user, e.target.checked)}
                                            setItemSelected={setItemSelected} />
                                            
                                            
                                        </div>
                                    ))}
                                </div>


                                <div style={{ width: '470px', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                    <Button style={{ width: '100px', height: '40px' }}
                                        onClick={() => {toggleForwardModal(); setSelectedMembers([]);}}
                                    >
                                        <Text>Hủy</Text>
                                    </Button>


                                    <Button style={{ width: '100px', height: '40px', marginLeft: '10px', backgroundColor: '#36373A' }}
                                    onClick={() => {handleShare()}}
                                    >
                                        <Text style={{ color: 'white' }}>Chia sẻ</Text>
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