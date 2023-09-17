import axios from "axios";
import { urls, headers } from "../env";
import { Message } from "../pages/Chat/Right/ChatFormats";
import { Info } from "../static/types";

class Requests {
    error = "There was a problem while fetching data!";
    constructor() {

    }

    fetchInfo = async (chatID: number): Promise<Info> => {
        try {
            const response = await axios.get(urls.getChatInfo, {
                headers,
                params: { chatID: chatID },
            });
            const chatInfo: Info = response.data;
            return chatInfo;
        } catch (err) {
            throw new Error(this.error);
        }
    };

    send = async (value: string, chatID: number, file?: File) => {
        if (value === "") {
            throw new Error(this.error);
        }

        try {
            let res = await axios.post(
                urls.sendMessage,
                {
                    message: value,
                    type: "text",
                    chatID: chatID,
                },
                { headers }
            );
            let data: Message = res.data;
            
            return data;
        } catch (error) {
            throw new Error(this.error);
        }
    };

    fetchUsername = async (): Promise<string> => {
        try {
            const response = await axios.get(urls.user_profile, { headers });
            return response.data.username
        } catch (err) {
            throw new Error(this.error)
        }
    };
}

export default new Requests;