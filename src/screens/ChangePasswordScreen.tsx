import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { TextInput } from 'react-native-paper';
import AuthApi from "../../api/AuthApi";

import CustomButton from "../components/CustomButton";

const mainColor = '#f4511e';


export default function ChangePasswordScreen({ navigation }: any) {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const onSubmit = async () => {
        if (password === confirmPassword) {
            AuthApi.changePassword(oldPassword, password)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.actionContainer}>
                <TextInput
                    label="Old password"
                    secureTextEntry={true}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    placeholder="Old password"
                    placeholderTextColor="#777777"
                    autoCorrect={false} style={styles.input}
                    underlineColor={mainColor}
                    theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                />
            </View>
            <View style={styles.actionContainer}>
                <TextInput
                    label="New password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholder="New password"
                    placeholderTextColor="#777777"
                    autoCorrect={false} style={styles.input}
                    underlineColor={mainColor}
                    theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                />
            </View>
            <View style={styles.actionContainer}>
                <TextInput
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Repeat new password"
                    placeholderTextColor="#777777"
                    autoCorrect={false} style={styles.input}
                    underlineColor={mainColor}
                    theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center' }}>
                <CustomButton text="Change" onPress={onSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    submitButton: {
        width: '50%'
    }
});
