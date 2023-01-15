import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import UserApi from "../../api/UserApi";
import AddContactUserListItem from "../components/AddContactUserListItem";
import { IContactListItem } from "../types";
import "../../i18n.config";
import { useTranslation } from "react-i18next";

const mainColor = '#f4511e';

export default function AddContactScreen({navigation}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<IContactListItem[]>([]);
  const { t } = useTranslation();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  }

  useEffect(() => {
    navigation.setOptions({
      title: t("addContact.header"),
    });
  }, [navigation, t]);

  useEffect(() => {
    UserApi.filterUsers("").then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then(text => { throw new Error(text) })
      }
    }).then(data => {
      console.log(data);
      setSearchedUsers(data);
    });
  }, [])

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
        style={{backgroundColor: 'white', borderColor: mainColor}}
      />
      <FlatList style={{ width: '100%' }} data={searchedUsers} renderItem={({ item }) => <AddContactUserListItem contact={item} />} />
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