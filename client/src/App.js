import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';
const ENDPOINT = 'http://127.0.0.1:4001';

const socket = io(ENDPOINT);

function App() {
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receivedMessage', messageObj => pushMessageToArray(messageObj));
    socket.on('previousMessages', messagesFromSocket => {
      setMessages(messagesFromSocket);
    });
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (username.length && msg.length) {
      var messageObject = {
        author: username,
        message: msg
      };

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
  return (
    <div style={{paddingTop: 50}}>
      <form id='chat' onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          name='username'
          placeholder='Digite seu usuario'
          onChange={e => setUsername(e.target.value)}
        />
        <div className='messages'>{renderMessages()}</div>
        <input type='text' name='message' placeholder='Digite sua mensagem' onChange={e => setMsg(e.target.value)} />
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default App;
