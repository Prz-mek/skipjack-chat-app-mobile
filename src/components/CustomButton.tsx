import React from "react";
import { Pressable, Text, StyleSheet } from 'react-native';


export interface ICustomButtonProps {
    text: String;
    onPress: (e: any) => void; //TODO find type
}

const newColor = '#f4915e';
const mainColor = '#f4511e';

export default function CustomButton(props: ICustomButtonProps) {


    return (
        <Pressable onPress={props.onPress} style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '50%',
      backgroundColor: newColor,
      padding: 12,
      marginVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    }
  });