
export interface User {
    id: string;
    name: string;
}

export interface IConversationListItem {
    id: string;
    name: string;
    imageUri: string;
    lastMessage: {
        senderName: string,
        text: string,
        createdAt: string
    };
}

export interface IContactListItem {
    id: string;
    name: string;
    imageUri: string;
}

export interface IMessage {
    id: string,
    senderId: string,
    senderName: string,
    text: string,
    createdAt: string
}