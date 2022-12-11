import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IMessage } from '../types';

const blue = '#f46a35';
const grey = 'lightgrey';

const myID = '2';

export interface IMessageProps {
    message: IMessage;
}

export default function Message({message}: IMessageProps) {

  const isMe = message.senderId === myID;

  return (
    
      isMe ? (
        <View>
          <View style={[styles.container, styles.rightContainer]}>
              <Text style={{ color: 'white'}}>{message.text}</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={ styles.leftName }>{message.senderUsername}</Text>
          <View style={[styles.container, styles.leftContainer]}>
              <Text style={{ color: 'black'}}>{message.text}</Text>
          </View>
        </View>
      )
    
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 3,
    borderRadius: 10,
    maxWidth: '70%',
  },
  leftContainer: {
    backgroundColor: grey,
    marginLeft: 10,
    marginRight: 'auto'
  },
  rightContainer: {
    backgroundColor: blue,
    marginLeft: 'auto',
    marginRight: 10,
  },
  leftName: {
    extAlign: 'left',
    marginLeft: 15,
    marginBottom: 3,
    marginRight: 'auto'
  },
  rightName: {
    textAlign: 'right',
    marginLeft: 'auto',
    marginBottom: 3,
    marginRight: 15,
  },
});