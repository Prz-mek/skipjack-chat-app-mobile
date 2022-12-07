import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface INewContactButtonProps {
    onPress: () => void
}

export default function NewConversationButton(props: INewContactButtonProps) {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <MaterialCommunityIcons name="chat-plus" size={26} color="white" />
        </Pressable>
    )
}


const styles = StyleSheet.create({
   container: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 5,
    justifyContent: 'center',
   },
});