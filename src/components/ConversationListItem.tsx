import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useConversations } from "../contexts/ConversationsContext";
import { IConversationListItem } from "../types";

export interface IConversationListItemProps {
    conversation: IConversationListItem;
}

export default function ConversationListItem(props: IConversationListItemProps) {
    const { conversation } = props;
    const { selectConversation } = useConversations();
    const navigation = useNavigation();

    const onPress = () => {
        selectConversation(conversation.id.toString());
        navigation.navigate("ConversationRoom" as never, { id: conversation.name } as never);
    }

    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: conversation.imageUri}} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.conversationName}>{conversation.name}</Text>
                        <Text style={styles.lastMessage}>{`${conversation.lastMessage?.senderUsername}: ${conversation.lastMessage?.text}`}</Text>
                    </View>
                </View>
                {/* <Text>{chatRoom.lastMessage.createdAt}</Text> */}
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