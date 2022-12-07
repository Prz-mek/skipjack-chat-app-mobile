import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


interface INewContactButtonProps {
    onPress: () => void
}

export default function NewContactButton(props: INewContactButtonProps) {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <MaterialIcons name="person-add" size={26} color="white" />
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