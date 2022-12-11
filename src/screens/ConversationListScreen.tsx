import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ConversationListItem from "../components/ConversationListItem";
import { useConversations } from "../contexts/ConversationsContext";
import ConversationListData from "../mock/ConversationListData";

export default function ConversationListScreen() {

  const { conversations } = useConversations();

  return (
    <View style={styles.container}>
      <FlatList style={{ width: '100%' }} data={conversations} renderItem={({ item }) => <ConversationListItem conversation={item} />} />
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