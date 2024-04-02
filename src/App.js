import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/ChatSingle/Chat';
import ChatGroup from './components/ChatGroup/ChatGroup';
import Friend from './components/Friend/Friend';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Register_Verifi from './components/Register/Register_Verifi';
import Register_Inf from './components/Register/Register_Inf';
import { Provider } from 'react-redux';
import store from './redux/store';
import TabBar from './components/BottomTab/TabBar';
import Profile from './components/Profile/Profile';
import SideBar from './components/ChatSingle/SideBar';
import ChatWindow from './components/ChatSingle/ChatWindow';
import Find from './components/ChatSingle/Find';
import ChatList from './components/ChatSingle/ChatList';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <Provider store={store}>
      <div>
          <Routes>
          {/* <Route exact path="/" element={<Welcome />} /> */}
            <Route exact path="/login" element={<Login />} />
            <Route path="/" element={<Register />} />
            <Route path="/registerverifi" element={<Register_Verifi />} />
            <Route path="/registerinf" element={<Register_Inf />} />
          </Routes>

          {/* <TabBar /> */}
          <Routes>
            {/* <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/registerverifi" element={<Register_Verifi />} />
          <Route path="/registerinf" element={<Register_Inf />} /> */}
            {/* <Route path='/' element={<TabBar />} />
          <Route path='/chat' element={<Chat />} />
          {/* <Route path='/sideBar' element={<SideBar />} />
          <Route path='/find' element={<Find />} />
          <Route path='/chatList' element={<ChatList />} />
          <Route path='/chatWindow' element={<ChatWindow />} /> */}
            <Route path='/chatGroup' element={<ChatGroup />} />
            <Route path='/friend' element={<Friend />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </div>
    </Provider>
  );
}

export default App;
