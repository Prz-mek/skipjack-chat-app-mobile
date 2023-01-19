import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import ConversationApi from "../../api/ConversationApi";
import { useConversations } from "../contexts/ConversationsContext";
import { IContactListItem } from "../types";
import {API_ADDRESS} from '@env';

export interface IContactListItemProps {
    contact: IContactListItem;
}

export default function ContactListItem(props: IContactListItemProps) {
    const { contact } = props;
    const { selectConversation } = useConversations();
    const navigation = useNavigation();

    const onPress = () => {
        // Get conversation room id from request /access
        ConversationApi.accessDirectConveration(contact.id).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(text => { throw new Error(text) })
            }
        }).then(conversation => {
            console.log(conversation);
            selectConversation(conversation.id.toString());
            navigation.navigate("ConversationRoom" as never, { id: conversation.name } as never);
        }).catch(error => console.log(error));
    }

    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={ contact.imageUri ? {uri: `${API_ADDRESS}/${contact.imageUri}`} : require("../../assets/default-profile.png")} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.conversationName}>{contact.username}</Text>
                    </View>
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
    }
});