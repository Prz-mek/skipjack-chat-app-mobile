import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
//import { useConversations } from "../contexts/ConversationsContext";


export default function MessageInput() {
    const [message, setMessage] = useState("");
    //const {sendMessage} = useConversations();

    const onSendMessage = () => {
        //console.warn("Sending: " + message);

        // send the message to the backend
        //sendMessage(message);
        //setMessage("");
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <TextInput placeholder="Type a message" value={message} onChangeText={setMessage} multiline />
            </View>
            <View style={styles.buttonContainer}>
                <MaterialIcons name="send" size={24} onPress={onSendMessage} color="white" />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
   container: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
   },
   textContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 5,
    marginRight: 10,
    padding: 5,
    justifyContent: 'center',
   },
   buttonContainer: {
    backgroundColor: '#f4511e',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
   }
});