import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Image, View, Text } from "react-native";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useConversations } from "../contexts/ConversationsContext";


function ConversationTitle(props: any) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={
          props.imageUri ? { uri: props.imageUri } 
            : props.group ? require("../../assets/default-group.png") : require("../../assets/default-profile.png")
        }
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }}
      />
      <Text style={{ color: "white", fontSize: 18, padding: 5 }}>{props.title}</Text>
    </View>
  );
}

export default function ConversationScreen({ navigation }: any) {

  const { selectedConversation, messages } = useConversations();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ConversationTitle title={selectedConversation?.name} image={selectedConversation?.imageUri} group={selectedConversation?.group} />
    });
  }, [navigation]);

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