import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ContactListItem from "../components/ContactListItem";
import ContactListData from "../mock/ContactListData";

export default function ConversationListScreen() {

  return (
    <View style={styles.container}>
      <FlatList style={{ width: '100%' }} data={ContactListData} renderItem={({ item }) => <ContactListItem contact={item} />} />
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