import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Badge, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { compareTimestamps, timeAgo } from '../providers/useFunctions';
import { url_main } from './env';

interface NewsArticle {
    message: string,
    createdAt: string
}

export const Messages = () => {
    const [menu, setMenu] = useState<null | HTMLElement>(null);
    const [news, setNews] = useState([] as NewsArticle[])

    const open = Boolean(menu);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget);
        loadMessages();
    };

    const handleClose = () => {
        setMenu(null);
    };

    const loadMessages = async (allNews = false) => {
        try {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            };
            let url = url_main + 'user/news';
            if (allNews) url += "/all"

            const data: NewsArticle[] = await (await axios.get(url, { headers })).data;

            const dataSorted = data.sort(compareTimestamps);
            setNews(dataSorted.map((article) => {
                return {
                    message: article.message,
                    createdAt: timeAgo(article.createdAt)
                }
            }));
           //  await axios.put(url_main + "user/news/readed", { headers })

        } catch (err) {
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
    }
    const showAllNews = async () => {
        loadMessages(true);
    }
    return (
        <>
            <IconButton onClick={handleClick}>
                <Badge badgeContent={1} color="error">
                    <EmailIcon />
                </Badge>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        maxHeight: 60 * 4.5,
                        width: '40ch',
                    },
                }}
            >
                <List sx={{ margin: "-7px" }}>
                    {news.map((article, i) => (
                        <div key={i + "Article"}>
                            <ListItem onClick={handleClose}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "green" }}>
                                        <SpeakerNotesIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={article.message} secondary={article.createdAt} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                    }
                    <ListItem >
                        {news.length == 0 ? "Nothing new" : <></>}
                    </ListItem>
                    <ListItem >
                        <Button onClick={showAllNews} sx={{ margin: "-10px" }}>
                            Show all news!
                        </Button>
                    </ListItem>
                </List>
            </Menu>
        </>
    )
}