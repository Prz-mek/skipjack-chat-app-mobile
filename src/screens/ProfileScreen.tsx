import { useActionSheet } from "@expo/react-native-action-sheet";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import {API_ADDRESS} from '@env';

import * as ImagePicker from 'expo-image-picker';
import "../../i18n.config";
import { useTranslation } from "react-i18next";
import * as FileSystem from 'expo-file-system';

import {
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import UserApi from "../../api/UserApi";
import { useAuthContext } from "../contexts/AuthContext";
import { FileSystemUploadType } from "expo-file-system/build/FileSystem.types";

const mainColor = '#f4511e';


export default function ProfileScreen({ navigation }: any) {
  const { showActionSheetWithOptions } = useActionSheet();
  const { user } = useAuthContext();
  const profile = user;
  
  const { logout } = useAuthContext();

  const { authToken } = useAuthContext();

  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t("profile.header"),
    });
  }, [navigation, t]);

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
    const LOCAL_URL = "/api/users"
      const uploadResult = await FileSystem.uploadAsync(`${API_ADDRESS}${LOCAL_URL}/avatar`, photo.uri, {
        httpMethod: 'POST',
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: 'photo',
        headers: {
          authorization: "Bearer " + authToken,
        },
      });
      console.warn(uploadResult);
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
          <Image source={profile && profile.imageUri ? { uri: `${API_ADDRESS}/${profile?.imageUri}` } : require("../../assets/default-profile.png")} style={styles.profilePicture} />
        </Pressable>
        <Text style={styles.username}>{profile?.username}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
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
