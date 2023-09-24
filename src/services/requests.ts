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

    send = async (value: string, chatID: number, files?: File[]) => {
        const files_defined = files ? files : [];


        if (value === "" && undefined == files) {
            throw new Error(this.error);
        }

        const form = new FormData();
        form.append("message", value);

        form.append("chatID", String(chatID));

        if (files_defined[0] && files_defined[0] != null) {
            form.append("file", files_defined[0]);
        }


        try {
            let res = await axios.post(
                urls.sendMessage,
                form,
                { headers }
            );
            files_defined.shift();


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