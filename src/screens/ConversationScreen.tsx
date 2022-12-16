import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useConversations } from "../contexts/ConversationsContext";


export default function ConversationScreen({ navigation }: any) {

  const { messages } = useConversations();

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={JSON.parse(JSON.stringify(messages)).reverse()}
        renderItem={({ item }) => (
          <Message message={item} />
        )}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});