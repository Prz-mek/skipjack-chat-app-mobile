import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import MessageListData from "../mock/MessageListData";


export default function ConversationScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={MessageListData.reverse()}
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
    //backgroundColor: "white",
    flex: 1,
  },
});