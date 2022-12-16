import { useActionSheet } from "@expo/react-native-action-sheet";
import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import ProfileData from "../mock/ProfileData";
import * as ImagePicker from 'expo-image-picker';
import "../../i18n.config";
import { useTranslation } from "react-i18next";

import {
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import UserApi from "../../api/UserApi";
import { useAuthContext } from "../contexts/AuthContext";

const mainColor = '#f4511e';


export default function ProfileScreen({ navigation }: any) {
  const { showActionSheetWithOptions } = useActionSheet();
  const profile = ProfileData;
  
  const {logout} = useAuthContext();

  const { t } = useTranslation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets[0]) {
      uploadPicture(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets[0]) {
      uploadPicture(result.assets[0]);
    }
  };

  async function uploadPicture(photo: any) {
    const data = new FormData();
    data.append('photo', {
      name: new Date() + "_profile",
      type: photo.type,
      uri: photo.uri,
    } as any);

    UserApi.uploadAvatar(data)
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }


  const onPressPicture = () => {
    const options = ['Take photo', 'Get from gallery'];
    const title = "Change profile picture";

    showActionSheetWithOptions({
      options,
      title
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 0:
          takePhoto();
          break;

        case 1:
          pickImage();
          break;
      }
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Pressable onPress={onPressPicture}>
          <Image source={profile.imageUri ? { uri: profile.imageUri } : require("../../assets/default-profile.png")} style={styles.profilePicture} />
        </Pressable>
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableRipple onPress={() => navigation.navigate("ChangeLanguage")}>
          <View style={styles.menuItem}>
            <MaterialIcons name="language" color={mainColor} size={26} />
            <Text style={styles.menuItemText}>{t("profile.changeLanguage")}</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ChangeUsername")}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="at" color={mainColor} size={26} />
            <Text style={styles.menuItemText}>{t("profile.changeUsername")}</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ChangePassword")}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="lock-outline" color={mainColor} size={26} />
            <Text style={styles.menuItemText}>{t("profile.changePassword")}</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={logout}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="logout" color={mainColor} size={26} />
            <Text style={styles.menuItemText}>{t("profile.logOut")}</Text>
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
