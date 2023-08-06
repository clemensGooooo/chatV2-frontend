
export const url_main = "http://localhost:5000/"

export const token_name = "token"
export const token = localStorage.getItem(token_name);

export const setToken = (token: string) => {
    localStorage.setItem(token_name,token);
}

export const logout = () => {
    localStorage.removeItem(token_name);
    window.location.reload();
}

export const headers = {
    Authorization: 'Bearer ' + token,
};

export const urls = {
    user_new_news: url_main + "user/news",
    user_all_news: url_main + "user/news/all",
    user_news_readed: url_main + "user/news/readed",
    user_profile: url_main + "user/profile",
    user_password_change: url_main + "user/password",
    user_profile_image: "user/profile/image",
    admin_checker: url_main + "admin",
    admin_users: url_main + "admin/users",
    admin_news: url_main + "admin/news",
    admin_news_write: url_main + "admin/news/new",
    auth_register: url_main + "auth/register",
    auth_login: url_main + "auth/login",
}