import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useConversations } from "../contexts/ConversationsContext";
import { IContactListItem } from "../types";
import { Checkbox } from 'react-native-paper';
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';

export interface IChatListItemProps {
    contact: IContactListItem;
}

export default function AddContactUserListItem(props: IChatListItemProps) {
    const { contact } = props;

    const [checked, setChecked] = useState(false);

    const navigation = useNavigation();

    const onPress = () => {
        // Get conversation room id from request /access

    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: contact.imageUri }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.conversationName}>{contact.name}</Text>
                    </View>
                </View>
                <Pressable onPress={onPress} style={styles.endContainer}>
                    <MaterialIcons name="add" size={30} color="black" />
                </Pressable>
            </View>
        </View>
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
    conversationName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    lastMessage: {
        fontSize: 16,
        color: 'gray',
    },
    time: {
        fontSize: 16,
        color: 'gray',
    },
    endContainer: {
        justifyContent: 'space-around',
        alignSelf: "flex-end",
        padding: 10,
    }
});