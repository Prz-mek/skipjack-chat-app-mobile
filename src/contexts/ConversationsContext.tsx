import React, { useCallback, useContext, useEffect, useState } from "react";
import ConversationApi from "../../api/ConversationApi";
import MessageApi from "../../api/MessageApi";
import { IConversationListItem, IMessage } from "../types";
import { useAuthContext } from "./AuthContext";
import { useSocket } from "./SocketContext";
import ConversationListData from "../mock/ConversationListData";

interface IConversationsContext {
    conversations: IConversationListItem[] | any[];
    messages: IMessage[] | any[];
    selectedConversation: IConversationListItem | undefined;
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
    const [conversations, setConversations] = useState<IConversationListItem[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<string>();

    const [selectedConversation, setSelectedConversation] = useState<IConversationListItem | undefined>(undefined);

    const socketM = useSocket();        // Of course | Why???

    const loadConversations = () => {
        ConversationApi.getCoversations().then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(text => { throw new Error(text) })
            }
        }).then(data => {
            setConversations(data);
        }).catch(error => console.log(error));
    }

    const loadMessages = (id: string) => {
        MessageApi.getMessages(id).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(text => { throw new Error(text) })
            }
        }).then(data => {
            const formatedMessages: IMessage[] = data;
            setMessages(formatedMessages);
        }).catch(error => console.log(error));
    }

    const onReceiveMessage = ({ conversationId, message }: any) => {
        const user: any = auth?.user;

        if (conversations.find((c: any) => c.id === conversationId) == null) {
            loadConversations();
        } else {
            if (conversationId === selectedConversationId) {
                setMessages([...messages, message]);
            }
            setConversations(prevConversations => {
                const newConversations = prevConversations.map(conversation => {
                    if (conversation.id.toString() === conversationId) {
                        return { ...conversation, lastMessage: message };
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

    async function createConversation(name: string, recipiants: string[]) {
        if (auth?.user) {
            ConversationApi.createConveration(name, [...recipiants, auth.user.id]).catch(error => console.log(error));
        }
        loadConversations();
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