export interface IProfile {
    id: string;
    username: string;
    email: string
    imageUri: string | null;
}

export interface IConversationListItem {
    id: string;
    name: string;
    imageUri: string;
    lastMessage: {
        senderId: string,
        senderUsername: string,
        text: string,
        createdAt: string,
        isRead: boolean,
    };
}

export interface IContactListItem {
    id: string;
    username: string;
    imageUri: string | null;
}

export interface IMessage {
    id: string,
    senderId: string,
    senderUsername: string,
    text: string,
    createdAt: string
}