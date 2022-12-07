import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ContactListItem from "../components/ContactListItem";
import ContactListData from "../mock/ContactListData";
import { Searchbar, TextInput } from 'react-native-paper';
import CreateConversationContactListItem from "../components/CreateConversationContactListItem";
import CustomButton from "../components/CustomButton";
import { IContactListItem } from "../types";

const mainColor = '#f4511e';

export default function CreateConversationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checked, setChecked] = useState<IContactListItem[]>([]);
  const [unchecked, setUnchecked] = useState<IContactListItem[]>(ContactListData);

  const onCheckedPress = (item: IContactListItem) => {
    setChecked(checked.filter(e => e.id != item.id));
    setUnchecked([...unchecked, item])
  }

  const onUncheckedPress = (item: IContactListItem) => {
    setUnchecked(unchecked.filter(e => e.id != item.id));
    setChecked([...checked, item])
  }

  const onChangeSearch = (query: string) => setSearchQuery(query.toLowerCase());

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <TextInput
          placeholder="Group name"
          placeholderTextColor="#777777"
          autoCorrect={false} style={styles.input}
          underlineColor={mainColor}
          theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
        />
      </View>
      <View>
        <FlatList style={{ width: '100%' }} data={checked.filter(e => e.name.toLowerCase().includes(searchQuery))} renderItem={({ item }) => <CreateConversationContactListItem isChecked={true} contact={item} onPress={() => onCheckedPress(item)} />} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <CustomButton text={"Create"} onPress={() => { }} />
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
        style={{backgroundColor: 'white', borderColor: mainColor}}
      />
      <FlatList style={{ width: '100%' }} data={unchecked.filter(e => e.name.toLowerCase().includes(searchQuery))} renderItem={({ item }) => <CreateConversationContactListItem isChecked={false} contact={item} onPress={() => onUncheckedPress(item)} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  actionContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  input: {
    paddingLeft: 10,
    color: '#05375a',
    backgroundColor: 'white',
  }
})