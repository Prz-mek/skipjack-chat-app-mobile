import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useConversations } from "../contexts/ConversationsContext";
import { ChatRoomListItem } from "../types";

export interface IChatListItemProps {
    chatRoom: ChatRoomListItem;
}

export default function ConversationListItem(props: IChatListItemProps) {
    const { chatRoom } = props;

    const { selectConversation } = useConversations();
    //const navigation = useNavigation();

    // const onClick = () => {
    //     //const s: string = chatRoom.id;
    //     selectConversation(chatRoom.id.toString());
    //     navigation.navigate('ChatRoom', { id: chatRoom.name });
    // }

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={require('./phone.png')} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.conversationName}>{chatRoom.name}</Text>
                        <Text style={styles.lastMessage}>{chatRoom.latestMessage?.text}</Text>
                    </View>
                </View>

                {/* <Text>{chatRoom.latestMessage && moment(chatRoom.latestMessage.createdAt).format("DD/MM/YYYY")}</Text> */}
            </View>
        </TouchableWithoutFeedback>
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
        width: 60,
        height: 60,
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