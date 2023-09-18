import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInfo from "./ChatInfo/Index";
import Requests from "../../../services/requests";
import { Info } from "../../../static/types";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { headers, urls } from "../../../env";
import { Message } from "./ChatFormats";
import ChatSend from "./Send/Send";
import ChatBox from "../../../components/Chat/Body/Message";
import LoadBefore from "../../../components/Chat/Body/LoadBefore";

const styles = {
  main: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  chatMessages: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      paddingTop: "15px",
      height: "100%",
      overflowY: "scroll",
  }
}
interface ChatContentProps {
  chatID: number;
  majorChange: (id: number) => void;
}

const Body = (props: ChatContentProps) => {
  const [chatInfo, setChatInfo] = useState({} as Info);
  const [mode, setMode] = useState(0); // 0 main chat - 1 chat info
  const [messages, setMessages] = useState([] as Message[]);
  const [user, setUser] = useState("" as string);
  const [change, setChange] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null as any);
  const chatMessages = useRef(null as null | HTMLDivElement);

  useEffect(() => {
    setMode(0);
    const getChatInfo = async () => {
      let chatInfo = await Requests.fetchInfo(props.chatID);
      setChatInfo(chatInfo);
    };
    getChatInfo();

    setMessages([]);
    setPage(1);
  }, [props.chatID]);

  const loadMessages = async () => {
    try {
      console.log("Data Request!", props.chatID);

      setIsLoading(true);
      const response = await axios.get(
        urls.getMessages + `?chatID=${props.chatID}&page=${page}`,
        {
          headers,
          params: { chatID: props.chatID },
        }
      );
      const newMessages = response.data;
      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const moveUp = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    loadMessages();
  }, [page, props.chatID]);

  useEffect(() => {
    const getUsername = async () => {
      let username = await Requests.fetchUsername();
      setUser(username);
    };

    getUsername();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [props.chatID, change]);

  return (
    <Box
      sx={styles.main}
    >
      <ChatHeader chat={chatInfo} clickInfo={() => setMode(1)} />
      {mode == 2 ? (
        <></>
      ) : (
        <>
          <Box
            ref={chatMessages}
            sx={styles.chatMessages}
          >
            {!messages.some((msg) => msg.user === "none") ? (
              <LoadBefore onClick={moveUp} />
            ) : (
              <></>
            )}
            {isLoading && (
              <CircularProgress
                sx={{
                  alignSelf: "center"
                }}
              />
            )}
            {messages.map((message) => (
              <ChatBox message={message} user={user} key={message._id} />
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <ChatSend
            chatID={props.chatID}
            sended={(newOne) => {
              setChange(change + 1);
              setMessages((messages) => [...messages, newOne]);
            }}
          />
        </>
      )}
      {mode == 1 ? (
        <ChatInfo
          chat={chatInfo}
          back={() => setMode(0)}
          majorChange={(id) => {
            if (id == 0) {
              setMode(0);
            }
            props.majorChange(id);
          }}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Body;
