export interface IProfile {
    id: string;
    username: string;
    email: string
    imageUri: string | null;
}

export interface IConversationListItem {
    id: string;
    name: string;
    group: boolean;
    imageUri: string | null | undefined;
    isLastMessageNotRead: boolean;
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
    imageUri: string | null | undefined;
}

export interface IMessage {
    id: string,
    senderId: string,
    senderUsername: string,
    text: string,
    createdAt: string
}