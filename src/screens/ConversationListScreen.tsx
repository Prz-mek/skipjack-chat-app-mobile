import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ConversationListItem from "../components/ConversationListItem";
import { useConversations } from "../contexts/ConversationsContext";
import { IConversationListItem } from "../types";

export default function ConversationListScreen() {

  const { conversations } = useConversations();

  console.log(conversations);

  return (
    <View style={styles.container}>
      <FlatList style={{ width: '100%' }} data={JSON.parse(JSON.stringify(conversations)).sort((e1: IConversationListItem, e2: IConversationListItem) => e1?.lastMessage?.createdAt <= e2?.lastMessage?.createdAt ? 1 : -1)} renderItem={({ item }) => <ConversationListItem conversation={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  })