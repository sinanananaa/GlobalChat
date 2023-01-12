import logo from './logo.svg';
import './App.css';
import ChatPage from './components/ChatPage';

//import socketIO from 'socket.io-client';
//const socket = socketIO.connect('http://localhost:8000');

function App() {
  return (
    <div>
      <ChatPage />
    </div>
  );
}

export default App;
