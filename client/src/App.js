import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';
const ENDPOINT = 'http://127.0.0.1:4001';

const socket = io(ENDPOINT);

function App() {
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState('');

  useEffect(() => {
    socket.on('receivedMessage', messageObj => pushMessageToArray(messageObj));
    socket.on('previousMessages', messagesFromSocket => {
      setMessages(messagesFromSocket);
    });
    socket.on('usertyping', userT => {
      setUserTyping(userT);
    });
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (username.length && msg.length) {
      var messageObject = {
        author: username,
        message: msg
      };

      setMsg('');
      pushMessageToArray(messageObject);
      socket.emit('sendMessage', messageObject);
    }
  }

  function pushMessageToArray(messageObj) {
    setMessages([...messages, messageObj]);
  }
  function renderMessages() {
    var aux = [];
    messages.map(eachMsg => {
      aux.push(
        <div className='message'>
          <strong> {eachMsg.author} </strong>: {eachMsg.message}
        </div>
      );
    });
    return aux;
  }

  function typeMessage(e) {
    const mes = e.target.value;

    socket.emit('typing', mes.length > 0 && username ? username : null);
    setMsg(mes);
  }

  return (
    <div style={{paddingTop: 50}}>
      <form id='chat' onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          name='username'
          value={username}
          placeholder='Username'
          onChange={e => setUsername(e.target.value)}
        />
        <div className='messages'>
          <div>{renderMessages()}</div>
          {userTyping && <p style={{}}>{userTyping + ' is typing...'}</p>}
        </div>
        <input
          value={msg}
          type='text'
          name='message'
          disabled={!username}
          placeholder={'Type your message' + (!username ? " (What's your Username?)" : '')}
          onChange={e => typeMessage(e)}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
