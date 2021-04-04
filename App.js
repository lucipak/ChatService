/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import axios from 'axios';
const io = require('socket.io-client');

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         onPress={() => console.log('hey')}
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const socket = io('http://localhost:4000');
  const isDarkMode = useColorScheme() === 'dark';
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    socket.connect();
    socket.on('connection', () => socket.send('Hello from client!'));
    socket.on('greetings', greeting => console.log(greeting));
    socket.on('newMessage', newMessage => {
      setMessages([...messages, newMessage]);
      setText('');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, messages]);

  const handleChange = async () => {
    socket.emit('message', text);
    // setText('Type message here');
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          }}>
          <Text style={styles.textColor}>This is Luci/Erics chat app!</Text>
          <TextInput
            placeholder="Test text input!"
            onChangeText={e => {
              setText(e);
            }}
            value={text}
          />
          <Button
            onPress={handleChange}
            title="Test Button"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          {messages.map(message => (
            <Text key={message}>{message}</Text>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textColor: {
    color: 'white',
  },
});

// socket.on('connect', () => {
//   // either with send()
//   socket.send('Hello!');

//   // or with emit() and custom event names
//   socket.emit(
//     'salutations',
//     'Hello!',
//     {mr: 'john'},
//     Uint8Array.from([1, 2, 3, 4]),
//   );
// });

// // handle the event sent with socket.send()
// socket.on('message', data => {
//   console.log(data);
// });

// // handle the event sent with socket.emit()
// socket.on('greetings', (elem1, elem2, elem3) => {
//   console.log(elem1, elem2, elem3);
// });

export default App;
