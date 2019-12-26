import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';

const ENDPOINT = 'http://127.0.0.1:4001';

function App() {
  const [socketIO, setSocketIO] = useState('');
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setSocketIO(io(ENDPOINT));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (username.length && msg.length) {
      var messageObject = {
        author: username,
        message: msg
      };

      socketIO.emit('sendMessage', messageObject);
    }
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
        <div className='messages'></div>
        <input type='text' name='message' placeholder='Digite sua mensagem' onChange={e => setMsg(e.target.value)} />
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default App;
