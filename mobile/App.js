import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Image, TextInput, View} from 'react-native';
import io from 'socket.io-client';
const BORDERPROPS = {borderWidth: 1, borderColor: 'grey'};
export default function Main({navigation}) {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const socket = io('http://localhost:3333');
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <TextInput
          placeholder="Name"
          value={username}
          onChangeText={text => setUsername(text)}
          style={BORDERPROPS}
        />
        <View style={{marginVertical: 10, height: 300, ...BORDERPROPS}}></View>
        <TextInput
          placeholder="Message"
          value={username}
          onChangeText={text => setUsername(text)}
          style={BORDERPROPS}
        />
      </View>
    </SafeAreaView>
  );
}
