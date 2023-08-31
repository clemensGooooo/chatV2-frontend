
export const url_main = "http://localhost:5000/"

export const token_name = "token"
export const token = localStorage.getItem(token_name);

export const setToken = (token: string) => {
    localStorage.setItem(token_name, token);
}

export const logout = () => {
    localStorage.removeItem(token_name);
    window.location.reload();
}

export const headers = {
    Authorization: 'Bearer ' + token,
};

export const urls = {
    chatImages: url_main + "chat/getImage",
    user_new_news: url_main + "user/news",
    user_all_news: url_main + "user/news/all",
    user_news_readed: url_main + "user/news/readed",
    user_profile: url_main + "user/profile",
    user_password_change: url_main + "user/password",
    user_profile_image: url_main + "user/profile/image",
    admin_checker: url_main + "admin",
    admin_users: url_main + "admin/users",
    admin_news: url_main + "admin/news",
    admin_news_write: url_main + "admin/news/new",
    auth_register: url_main + "auth/register",
    auth_login: url_main + "auth/login",
    connection_check: url_main + "check_connection",
    getChats: url_main + "chat/getChats",
    getMessages: url_main + "chat/getChatMessages",
    getChatInfo: url_main + "chat/getChatInfo",
    sendMessage: url_main + "chat/send",
    getUsers: url_main + "chat/getUsernames",
    createChat: url_main + "chat/createChat",
    uploadGroupImage: url_main + "chat/uploadGroupImage",
    getProfile: url_main + "chat/getProfile",
    editDescription: url_main + "chat/editChatText",
    editName: url_main + "chat/editChatName",
}

export interface Chat {
    name: string;
    chatID: number;
    lastInteraction: string;
    image: boolean;
    changed: number;
}