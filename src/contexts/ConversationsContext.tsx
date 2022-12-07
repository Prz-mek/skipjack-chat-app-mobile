import React, { useCallback, useContext, useEffect, useState } from "react";
import ConversationApi from "../../api/ConversationApi";
import MessageApi from "../../api/MessageApi";
import { ChatRoom, ChatRoomListItem, Message } from "../types";
import { useAuthContext } from "./AuthContext";
import { useSocket } from "./SocketContext";
import ConversationListData from "../mock/ConversationListData";

interface IConversationsContext {
    conversations: ChatRoom[] | any[];
    messages: Message[] | any[];
    selectedConversation: ChatRoomListItem | undefined;
    createConversation: (name: string, participants: string[]) => void;
    selectConversation: (id: string) => void;
    accessPrivateConversation: (id: string) => void;
    isSelected: (id: string) => boolean;
    sendMessage: (text: string) => void;
}

const ConversationsContext = React.createContext<IConversationsContext | undefined>(undefined);

function useConversations() {
    const context = useContext(ConversationsContext);
    if (!context) {
        throw new Error("No ConversationsContext.Provider found when calling useAuthContext.");
    }
    return context;
}

function ConversationsProvider(props: any) {
    let auth = useAuthContext();
    //const initialContacts: Conversation[] = [];
    const [conversations, setConversations] = useState<ChatRoomListItem[] | any[]>([]);
    const [messages, setMessages] = useState<Message[] | any[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<string>();

    const [selectedConversation, setSelectedConversation] = useState<ChatRoomListItem | any | undefined>(undefined);    // Why any???

    const socketM = useSocket();        // Of course | Why???

    const loadConversations = () => {
        // ConversationApi.getCoversations().then(res => {
        //     if (res.ok) {
        //         return res.json();
        //     }
        //     else throw Error("Here it is!! Problem!");
        // }).then(data => {
        //     setConversations(data);
        // }).catch(error => console.log("here"));
        setConversations(ConversationListData);
    }

    const loadMessages = (id: string) => {
        MessageApi.getMessages(id).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            const user: any = auth?.user;
            const formatedMessages: Message[] = data.map((message: any): Message => {
                return { ...message, fromMe: message.senderId === user.id };
            });
            setMessages(formatedMessages);
        }).catch(error => console.log(error));
    }

    const onReceiveMessage = ({ conversationId, message }: any) => {
        const user: any = auth?.user;
        message = { ...message, fromMe: message.senderId === user.id };

        if (conversations.find((c: any) => c.id === conversationId) == null) {
            loadConversations();
        } else {
            if (conversationId === selectedConversationId) {
                setMessages([...messages, message]);
            }
            setConversations(prevConversations => {
                const newConversations = prevConversations.map(conversation => {
                    if (conversation.id.toString() === conversationId) {
                        return { ...conversation, latestMessage: message };
                    } else {
                         return conversation;
                    }
                });
                return newConversations;
            });
        }
    }

    const receaveMessage = () => {
        if (socketM == null) {
            return;
        }

        const socket: any = socketM;
        socket.on("receive-message", onReceiveMessage);

        return () => socket.off("receive-message");
    }


    useEffect(loadConversations, [socketM]);
    useEffect(receaveMessage, [socketM, conversations, selectedConversationId, messages]);

    function sendMessage(text: string) {
        let socket: any = socketM;
        console.log({ conversation: selectedConversationId, sender: auth?.user?.id, text: text });
        socket?.emit("send-message", { conversation: selectedConversationId, sender: auth?.user?.id, text: text });
    }

    async function selectConversation(id: string) {
        setSelectedConversationId(id);
        setSelectedConversation(conversations.find(c => c.id === id));
        loadMessages(id);
    }

    function isSelected(id: string) {
        return id === selectedConversationId;
    }

    async function createConversation(name: string, recipiants: string[]) {     //crates conversation
        if (auth?.user) {
            ConversationApi.createConveration(name, [...recipiants, auth.user.id]).catch(error => console.log(error));
        }
        loadConversations();        //load conversation
    }

    async function accessPrivateConversation(id: string) {
        ConversationApi.accessDirectConveration(id).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Response not ok");
            }
        }).then(conversation => {
            if (conversations.find((c: any) => c.id === conversation.id)) {
                // TODO
            } else {
                setConversations([...conversations, conversation]);
            }
            selectConversation(conversation.id);
        }).catch(error => console.log(error));
    }

    return (
        <ConversationsContext.Provider value={{ conversations, messages, selectedConversation, createConversation, selectConversation, accessPrivateConversation, isSelected, sendMessage }}>{props.children}</ConversationsContext.Provider>
    )
}

export { ConversationsProvider, useConversations };