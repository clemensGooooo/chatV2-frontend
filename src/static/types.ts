export interface Info {
    chatID: number;
    name: string;
    members: string[];
    lastInteraction: string;
    chatText: string;
    image: boolean;
}

export interface Chat {
    name: string;
    chatID: number;
    lastInteraction: string;
    image: boolean;
    changed: number;
}