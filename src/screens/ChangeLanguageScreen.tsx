import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { RadioButton } from 'react-native-paper';

const mainColor = '#f4511e';

export default function ChangeLanguageScreen({ navigation }: any) {

    const { i18n } = useTranslation();
    const [value, setValue] = React.useState(i18n.language);

    return (
        <RadioButton.Group onValueChange={value => {setValue(value); i18n.changeLanguage(value); }} value={value} >
            <RadioButton.Item label="English" value="en"  color={mainColor}  />
            <RadioButton.Item label="polski" value="pl" color={mainColor} />
        </RadioButton.Group>
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
