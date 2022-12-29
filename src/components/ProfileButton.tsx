import React from "react";
import { Pressable, Image } from 'react-native';
import { useAuthContext } from "../contexts/AuthContext";
import {API_ADDRESS} from '@env';

export interface IProfileButtonProps {
    onPress: (e: any) => void; //TODO find type
}

const newColor = '#f4915e';
const mainColor = '#f4511e';

export default function ProfileButton(props: IProfileButtonProps) {
    const { user } = useAuthContext();
    const profile = user;

    return (
        <Pressable onPress={props.onPress} style={{marginLeft: 10}}>
            <Image
                source={
                    profile?.imageUri ? {uri: `${API_ADDRESS}/${profile.imageUri}`} : require("../../assets/default-profile.png")
                }
                style={{ width: 40, height: 40, borderRadius: 30 }}
            />
        </Pressable>
    )
}