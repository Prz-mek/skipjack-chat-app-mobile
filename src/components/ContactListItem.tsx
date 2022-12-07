import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useConversations } from "../contexts/ConversationsContext";
import { IContactListItem } from "../types";

export interface IChatListItemProps {
    contact: IContactListItem;
}

export default function ContactListItem(props: IChatListItemProps) {
    const { contact } = props;

    const navigation = useNavigation();

    const onPress = () => {
        // Get conversation room id from request /access
        navigation.navigate("ConversationRoom" as never, { id: contact.name } as never);
    }

    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: contact.imageUri}} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.conversationName}>{contact.name}</Text>
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