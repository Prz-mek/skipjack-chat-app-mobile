import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Searchbar, TextInput } from 'react-native-paper';
import UserApi from "../../api/UserApi";
import CreateConversationContactListItem from "../components/CreateConversationContactListItem";
import CustomButton from "../components/CustomButton";
import { useConversations } from "../contexts/ConversationsContext";
import { IContactListItem } from "../types";

const mainColor = '#f4511e';

export default function CreateConversationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checked, setChecked] = useState<IContactListItem[]>([]);
  const [unchecked, setUnchecked] = useState<IContactListItem[]>([]);
  const [name, setName] = useState("");

  const { createConversation } = useConversations();
  const navigation = useNavigation();

  const onCheckedPress = (item: IContactListItem) => {
    setChecked(checked.filter(e => e.id != item.id));
    setUnchecked([...unchecked, item]);
  }

  const onUncheckedPress = (item: IContactListItem) => {
    setUnchecked(unchecked.filter(e => e.id != item.id));
    setChecked([...checked, item]);
  }

  const handleSubmit = () => {
    const recipiants = checked.map(e => e.id);
    createConversation(name, recipiants);
    navigation.navigate("InnerTabNavigation" as never);
  }

  useEffect(() => {
    UserApi.getContacts().then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then(text => { throw new Error(text) })
      }
    }).then(data => {
      setChecked([]);
      setUnchecked(data);
    }).catch(error => console.log(error));
  }, [])

  const onChangeSearch = (query: string) => setSearchQuery(query.toLowerCase());

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <TextInput
          value={name}
          onChangeText={name => setName(name)}
          placeholder="Group name"
          placeholderTextColor="#777777"
          autoCorrect={false} style={styles.input}
          underlineColor={mainColor}
          theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
        />
      </View>
      <View>
        <FlatList style={{ width: '100%' }} data={checked} renderItem={({ item }) => <CreateConversationContactListItem isChecked={true} contact={item} onPress={() => onCheckedPress(item)} />} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <CustomButton text={"Create"} onPress={handleSubmit} />
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
        style={{backgroundColor: 'white', borderColor: mainColor}}
      />
      <FlatList style={{ width: '100%' }} data={unchecked.filter(e => e.username.toLowerCase().includes(searchQuery))} renderItem={({ item }) => <CreateConversationContactListItem isChecked={false} contact={item} onPress={() => onUncheckedPress(item)} />} />
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