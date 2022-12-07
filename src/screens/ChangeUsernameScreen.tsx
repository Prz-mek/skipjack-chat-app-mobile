import React from "react";
import { View, StyleSheet } from "react-native";

import { TextInput } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from "../components/CustomButton";

const mainColor = '#f4511e';

export default function ChangeUsernameScreen({ navigation }: any) {

    return (
        <View style={styles.container}>
            <View style={styles.actionContainer}>
                <TextInput
                    placeholder="Type new username"
                    placeholderTextColor="#777777"
                    autoCorrect={false} style={styles.input}
                    underlineColor={mainColor}
                    theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center' }}>
                <CustomButton text="Change" onPress={() => console.log('Pressed')} />
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
    }
});
