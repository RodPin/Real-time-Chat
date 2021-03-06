import React, {useState, useEffect, useRef} from 'react';
import {Text, Button, TextInput, View, ScrollView} from 'react-native';
import io from 'socket.io-client';

const BORDERPROPS = {borderWidth: 1, borderColor: 'grey'};
//Map emulator port with pc port
//adb reverse tcp:4001 tcp:4001
const ENDPOINT = 'http://127.0.0.1:4001';
const socket = io(ENDPOINT);

export default function App() {
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState('');
  var scrollViewRef = useRef();
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
        message: msg,
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
        <Text>
          <Text style={{color: 'black', fontSize: 20, padding: 5}}>
            {eachMsg.author}{' '}
          </Text>
          :{eachMsg.message}
        </Text>,
      );
    });
    return aux;
  }

  function typeMessage(mes) {
    socket.emit('typing', mes.length > 0 && username ? username : null);
    setMsg(mes);
  }

  function onFocusTxtInput() {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 50);
  }

  return (
    <View style={{padding: 10, flex: 1}}>
      <TextInput
        placeholder="Name"
        value={username}
        onChangeText={text => setUsername(text)}
        style={BORDERPROPS}
      />
      <ScrollView
        style={{
          marginVertical: 10,
          flex: 0.8,
        }}
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollViewRef.current.scrollToEnd({animated: true});
          // console.log(scrollViewRef);
        }}>
        {renderMessages()}
      </ScrollView>
      <View
        style={{
          bottom: 0,
          padding: 10,
          width: 400,
          backgroundColor: 'white',
        }}>
        {userTyping ? <Text>{userTyping} is typing...</Text> : null}
        <TextInput
          placeholder={
            'Type your message' + (!username ? " (What's your Username?)" : '')
          }
          value={msg}
          onChangeText={text => typeMessage(text)}
          onFocus={() => onFocusTxtInput()}
          style={{marginBottom: 10, ...BORDERPROPS}}
        />
        <Button
          color="purple"
          title="Submit"
          onPress={e => handleSubmit(e)}></Button>
      </View>
    </View>
  );
}
