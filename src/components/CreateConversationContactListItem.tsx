import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useConversations } from "../contexts/ConversationsContext";
import { IContactListItem } from "../types";
import { Checkbox } from 'react-native-paper';
import { useState } from "react";
import {API_ADDRESS} from '@env';

export interface ICreateConversationContactListItemProps {
    isChecked: boolean;
    contact: IContactListItem;
    onPress: () => void;
}

export default function CreateConversationContactListItem(props: ICreateConversationContactListItemProps) {
    const { isChecked, contact, onPress } = props;
    const navigation = useNavigation();


    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={ contact.imageUri ? { uri: `${API_ADDRESS}/${contact.imageUri}` } : require("../../assets/default-profile.png")} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.userName}>{contact.username}</Text>
                    </View>
                </View>
                <View style={styles.endContainer}>
                    <Checkbox
                        color="red"
                        status={isChecked ? 'checked' : 'unchecked'}
                        onPress={onPress}
                    />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    leftContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        justifyContent: 'space-around',
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    endContainer: {
        justifyContent: 'space-around',
        alignSelf: "flex-end"
    }
});