import React from "react";
import { Pressable, Text, StyleSheet } from 'react-native';


export interface ILinkLikeButtonProps {
    text: String;
    onPress: (e: any) => void; //TODO find type
}

const mainColor = '#f4511e';

export default function LinkLikeButton(props: ILinkLikeButtonProps) {


    return (
        <Pressable onPress={props.onPress} style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: 'transparent',
      padding: 12,
      marginVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: "#554411",
    }
  });