import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { headers, urls } from "../../../../env";
import { Message } from "../ChatFormats";
import ChatSend from "../Send/Send";
import ChatBox from "../../../../components/Chat/Body/Message";

const ChatMessages = (props: { chatID: number }) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [user, setUser] = useState("" as string);
  const [change, setChange] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = async () => {
    try {
      console.log("Data Request!");
      
      setIsLoading(true);
      const response = await axios.get(
        urls.getMessages + `?chatID=${props.chatID}&page=${page}`,
        {
          headers,
          params: { chatID: props.chatID },
        }
      );
      const newMessages = response.data.reverse();
      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMessages([]);
    loadMessages();
    setPage(1);
  }, [props.chatID, change]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(urls.user_profile, { headers });
        setUser(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();
  }, []);

  const messagesEndRef = useRef(null as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (containerRef.current?.scrollTop === 0 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
      loadMessages();
    }
  };

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [props.chatID]);

  return (
    <>
      <div
        ref={containerRef}
        className="chat-content"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "15px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {isLoading && (
          <CircularProgress
            style={{
              alignSelf: "center",
            }}
          />
        )}
        {messages.map((message) => (
          <ChatBox message={message} user={user} key={message._id} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatSend chatID={props.chatID} sended={() => setChange(change + 1)} />
    </>
  );
};

export default ChatMessages;
