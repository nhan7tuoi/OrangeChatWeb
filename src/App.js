import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/ChatSingle/Chat';
import ChatGroup from './components/ChatGroup/ChatGroup';
import Friend from './components/Friend/Friend';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Register_Verifi from './components/Register/Register_Verifi';
import Register_Inf from './components/Register/Register_Inf';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import TabBar from './components/BottomTab/TabBar';
import Profile from './components/Profile/Profile';
import SideBar from './components/ChatSingle/SideBar';
import ChatWindow from './components/ChatSingle/ChatWindow';
import Find from './components/ChatSingle/Find';
import ChatList from './components/ChatSingle/ChatList';

import Welcome from './components/Welcome/Welcome';

import ChangePass from './components/Profile/ChangePass';
import ForgetPass from './components/Profile/ForgetPass';
import Information from './components/Profile/Information';

import PrivateRoute from './components/Layout/PrivateRoute';
import MainLayout from './components/Layout/MainLayout';

import React, { useEffect, useState } from 'react'


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   // Giả sử bạn có thể kiểm tra trạng thái đăng nhập thông qua local storage hoặc Redux
  //   const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
  //   setIsLoggedIn(loggedInStatus);
  // }, []);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
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

        {/* {isLoggedIn && <TabBar />} */}
        <TabBar/>
        <Routes>

          

            <Route path='/chatGroup' element={user.name ? <ChatGroup /> : <Login />}/>
            <Route path='/friend' element={user.name ? <Friend /> : <Login />} />
            <Route path='/chat' element={user.name ? <Chat /> : <Login />} />
            <Route path='/profile' element={user.name ? <Profile /> : <Login />} />
            <Route path='/information' element={user.name ? <Information  /> : <Login />} />
         
        </Routes>
      </div>
  );
}

export default App;
