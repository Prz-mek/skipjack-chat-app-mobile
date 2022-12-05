
export interface User {
    id: string;
    name: string;
}

export interface MessageToList {
    text: String;
    sender: User;
}

export interface ChatRoomListItem {
    id: String;
    name: String
    latestMessage: MessageToList;
}