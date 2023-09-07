export interface Message {
    _id: string;
    user: string;
    message: string;
    timestamp: string;
    chatID: number;
    type: string;
    readed: any[]; ///////////////////////////////////////////////////////////////////////
    __v: number;
}

export interface ChatLarge {
    chatID: number;
    name: string;
    members: string[];
    lastInteraction: string;
    chatText: string;
    image: boolean;
}