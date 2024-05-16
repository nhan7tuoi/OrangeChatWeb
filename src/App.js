import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/ChatSingle/Chat';
import Friend from './components/Friend/Friend';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Register_Verifi from './components/Register/Register_Verifi';
import Register_Inf from './components/Register/Register_Inf';
import { useDispatch, useSelector } from 'react-redux';
import TabBar from './components/BottomTab/TabBar';
import Profile from './components/Profile/Profile';
import ChatWindow from './components/ChatSingle/ChatWindow';
import ChangePass from './components/Profile/ChangePass';
import ForgetPass from './components/Profile/ForgetPass';
import Information from './components/Profile/Information';
import React, { useEffect } from 'react';
import FriendsRequest from './components/Friend/FriendRequest';
import FriendsSearch from './components/Friend/FriendSearch';
import ChatGroup from './components/ChatGroup/Chat';
import { authenticateUser } from './redux/authLogin';

function App() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(user && user.name); // Kiểm tra nếu user và user.name tồn tại
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token: ",token);
    if (token) {
      dispatch(authenticateUser(token));
    }
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerverifi" element={<Register_Verifi />} />
        <Route path="/registerinf" element={<Register_Inf />} />
        <Route path='/forgotpassword' element={<ForgetPass />} />
        <Route path='/changepass' element={<ChangePass />} />
        {/* <Route path='/welcome' element={<Welcome />} /> */}
      </Routes>

      <Routes>
        <Route path='/chatWindow' element={<ChatWindow />} />
      </Routes>

      {isLoggedIn && <TabBar />} {/* Chỉ hiển thị TabBar khi đã đăng nhập */}
      {/* <Routes>
        <Route path='/chatGroup' element={<ChatGroup />} />
        <Route path='/friend' element={ <Friend /> } />
        <Route path='/friendrequest' element={ <FriendsRequest /> } />
        <Route path='/friendSearch' element={ <FriendsSearch /> } />
        <Route path='/chat' element={ <Chat /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/information' element={ <Information /> } />
      </Routes> */}

      <Routes>
        <Route path='/chatGroup' element={isLoggedIn ? <ChatGroup /> : <Login />} />
        <Route path='/friend' element={isLoggedIn ? <Friend /> : <Login />} />
        <Route path='/friendrequest' element={isLoggedIn ? <FriendsRequest /> : <Login />} />
        <Route path='/friendSearch' element={isLoggedIn ? <FriendsSearch /> : <Login />} />
        <Route path='/chat' element={isLoggedIn ? <Chat /> : <Login />} />
        <Route path='/profile' element={isLoggedIn ? <Profile /> : <Login />} />
        <Route path='/information' element={isLoggedIn ? <Information /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
