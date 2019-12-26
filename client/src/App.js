import React, {useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';

const ENDPOINT = 'http://127.0.0.1:4001';

function App() {
  useEffect(() => {
    const socket = io(ENDPOINT);
    // socket.on('FromAPI', data => this.setState({response: data}));
  }, []);

  return (
    <div style={{paddingTop: 50}}>
      <form id='chat'>
        <input type='text' name='username' placeholder='Digite seu usuario' />
        <div class='messages'></div>
        <input type='text' name='message' placeholder='Digite sua mensagem' />
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default App;
