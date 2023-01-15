import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import UserApi from "../../api/UserApi";
import ContactListItem from "../components/ContactListItem";
import { IContactListItem } from "../types";
import "../../i18n.config";
import { useTranslation } from "react-i18next";


export default function ContactListScreen({navigation}: any) {
  const [contacts, setContacts] = useState<IContactListItem[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t("contactsList.header"),
    });
  }, [navigation, t]);

  useEffect(() => {
    UserApi.getContacts().then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then(text => { throw new Error(text) })
      }
    }).then(data => {
      console.log(data);
      setContacts(data);
    }).catch(error => console.log(error));
  }, [])

  return (
    <View style={styles.container}>
      <FlatList style={{ width: '100%' }} data={contacts} renderItem={({ item }) => <ContactListItem contact={item} />} />
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