import React, { useState } from "react";
import { View, ScrollView, Image, StyleSheet, Button } from 'react-native';
import CustomButton from "../components/CustomButton";
import { useAuthContext } from "../contexts/AuthContext";
import { TextInput } from 'react-native-paper';
import LinkLikeButton from "../components/LinkLikeButton";

const mainColor = '#f4511e';

export default function RegisterScreen({ navigation }: any /*RootStackScreenProps<'SignIn'>*/) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const auth = useAuthContext();

    const onSignUp = async () => {
        // auth?.login(email, password).catch((err: Error) => console.error(err));        
    }

    const onToSingIn = () => {
        navigation.navigate('Login');
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
                <View style={{ margin: 5 }}>
                    <View style={styles.actionContainer}>
                        <TextInput
                            placeholder="username"
                            placeholderTextColor="#777777"
                            autoCorrect={false} style={styles.input}
                            underlineColor={mainColor}
                            theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                        />
                    </View>
                </View>
                <View style={{ margin: 5 }}>
                    <View style={styles.actionContainer}>
                        <TextInput
                            placeholder="email"
                            secureTextEntry={true}
                            placeholderTextColor="#777777"
                            autoCorrect={false} style={styles.input}
                            underlineColor={mainColor}
                            theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                        />
                    </View>
                </View>
                <View style={{ margin: 5 }}>
                    <View style={styles.actionContainer}>
                        <TextInput
                            placeholder="password"
                            secureTextEntry={true}
                            placeholderTextColor="#777777"
                            autoCorrect={false} style={styles.input}
                            underlineColor={mainColor}
                            theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                        />
                    </View>
                </View>
                <View style={{ margin: 5 }}>
                    <View style={styles.actionContainer}>
                        <TextInput
                            placeholder="confirm password"
                            secureTextEntry={true}
                            placeholderTextColor="#777777"
                            autoCorrect={false} style={styles.input}
                            underlineColor={mainColor}
                            theme={{ colors: { primary: mainColor, placeholder: mainColor } }}
                        />
                    </View>
                </View>
                <View style={{ margin: 5, alignItems: 'center' }}>
                    <CustomButton text={"Register"} onPress={onSignUp} />
                    <LinkLikeButton text={"Already have account? Sign in!"} onPress={onToSingIn} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    logo: {
        alignSelf: 'center',
        width: '70%',
        maxHeight: 300,
        margin: 20,
        marginVertical: 50,

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
