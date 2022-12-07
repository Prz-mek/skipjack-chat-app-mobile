import React from "react";
import { Pressable, Image } from 'react-native';
import ProfileData from "../mock/ProfileData";


export interface ICustomButtonProps {
    onPress: (e: any) => void; //TODO find type
}

const newColor = '#f4915e';
const mainColor = '#f4511e';

export default function ProfileButton(props: ICustomButtonProps) {

    const profile = ProfileData;

    return (
        <Pressable style={{marginLeft: 10}}>
            <Image
                source={{
                    uri: profile?.imageUri,
                }}
                style={{ width: 40, height: 40, borderRadius: 30 }}
            />
        </Pressable>
    )
}