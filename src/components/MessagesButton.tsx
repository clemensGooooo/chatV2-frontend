import EmailIcon from '@mui/icons-material/Email';
import {
    Avatar, Badge, Divider, IconButton, List,
    ListItem, ListItemAvatar, ListItemText, Menu,
    Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { compareTimestamps, timeAgo } from '../providers/useFunctions';
import { url_main } from './env';
import MarkdownRenderer from './MessageText';

interface NewsArticle {
    message: string,
    createdAt: string
}

interface NewsArticlesObj {
    data: NewsArticle[],
    all: boolean
}


const styleExpandMin: React.CSSProperties = {
    margin: "-10px 0px",
    cursor: "pointer",
    textDecoration: 'underline',
    color: "orange"
}
export const Messages = () => {
    const [menu, setMenu] = useState<null | HTMLElement>(null);
    const [news, setNews] = useState({ data: [], all: false } as NewsArticlesObj)

    const headers = {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
    };

    useEffect(() => {
        loadMessages();
    }, [])
    const open = Boolean(menu);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget);
        loadMessages();
        setReaded();
    };

    const handleClose = () => {
        setMenu(null);
    };

    const loadMessages = async (allNews = false) => {
        try {
            let url = url_main + 'user/news';
            if (allNews) url += "/all"

            const data: NewsArticle[] = await (await axios.get(url, { headers })).data;

            const dataSorted = data.sort(compareTimestamps).map((article) => {
                return {
                    message: article.message,
                    createdAt: timeAgo(article.createdAt)
                }
            });
            setNews({ data: dataSorted, all: allNews })

        } catch (err) {
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
    }
    const showAllNews = async (how: boolean) => {
        loadMessages(how);
    }

    const setReaded = async () => {
        await axios.get(url_main + "user/news/readed", { headers })
    }
    return (
        <>
            <IconButton onClick={handleClick}>
                <Badge badgeContent={menu == null && !news.all ? news.data.length : 0} color="error">
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
                    {news.data.map((article, i) => (
                        <div key={i + "Article"}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "green" }}>
                                        <SpeakerNotesIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <div className='newsText'>
                                            <MarkdownRenderer content={article.message} />
                                        </div>
                                    }
                                    secondary={article.createdAt} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                    }
                    <ListItem >
                        {news.data.length === 0 ? "Nothing new" : <></>}
                    </ListItem>
                    <ListItem >
                        {!news.all ?
                            <Typography onClick={() => showAllNews(true)}
                                sx={styleExpandMin}>
                                Show all news
                            </Typography>
                            :
                            <Typography onClick={() => showAllNews(false)}
                                sx={styleExpandMin}>
                                Show just new news
                            </Typography>
                        }
                    </ListItem>
                </List>
            </Menu>
        </>
    )
}