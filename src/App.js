import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/ChatRoom/Chat';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
