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

