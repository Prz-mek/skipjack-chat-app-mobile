import { useActionSheet } from "@expo/react-native-action-sheet";
import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import ProfileData from "../mock/ProfileData";

import {
  //Avatar,
  Title,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const mainColor = '#f4511e';


export default function ProfileScreen({ navigation }: any) {

  const { showActionSheetWithOptions } = useActionSheet();

  const onPressPicture = () => {
    const options = ['Delete', 'Save', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 1:
          // Save
          break;

        case destructiveButtonIndex:
          // Delete
          break;

        case cancelButtonIndex:
        // Canceled
      }
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Pressable onPress={onPressPicture}>
          <Image source={{ uri: ProfileData.imageUri }} style={styles.profilePicture} />
        </Pressable>
        <Text style={styles.username}>{ProfileData.name}</Text>
        <Text style={styles.email}>{ProfileData.email}</Text>
      </View>
      <View  style={styles.menuContainer}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="language" color={mainColor} size={26}/>
            <Text style={styles.menuItemText}>Language</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ChangeUsername")}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="at" color={mainColor} size={26}/>
            <Text style={styles.menuItemText}>Change Username</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ChangePassword")}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="lock-outline" color={mainColor} size={26}/>
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="logout" color={mainColor} size={26}/>
            <Text style={styles.menuItemText}>Log out</Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    paddingHorizontal: 30,
    marginBottom: 30,
    marginTop: 15,
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 15,
    color: '#777777',
  },
  menuContainer: {
    padding: 5
  },
  profilePicture: {
    width: 250,
    height: 250,
    borderRadius: 200,
    margin: 10,
    borderWidth: 10,
    borderColor: 'white',
    borderStyle: 'solid',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#555555',
    marginLeft: 20,
    fontSize: 17,
    lineHeight: 26,
  },
});
