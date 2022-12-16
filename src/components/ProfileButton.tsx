import React from "react";
import { Pressable, Image } from 'react-native';
import ProfileData from "../mock/ProfileData";


export interface IProfileButtonProps {
    onPress: (e: any) => void; //TODO find type
}

const newColor = '#f4915e';
const mainColor = '#f4511e';

export default function ProfileButton(props: IProfileButtonProps) {

    const profile = ProfileData;

    return (
        <Pressable onPress={props.onPress} style={{marginLeft: 10}}>
            <Image
                source={
                    profile?.imageUri ? {uri: profile.imageUri} : require("../../assets/default-profile.png")
                }
                style={{ width: 40, height: 40, borderRadius: 30 }}
            />
        </Pressable>
    )
}