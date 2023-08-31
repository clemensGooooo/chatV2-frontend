import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { headers, urls } from "../../../env";
import { Message } from "./ChatContent";
import ChatSend from "./ChatSend";
import ChatBox from "./Message";

const ChatMessages = (props: { chatID: number }) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [user, setUser] = useState("" as string);
  const [change, setChange] = useState(0);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(urls.getMessages, {
          headers,
          params: { chatID: props.chatID },
        });
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUsername = async () => {
      try {
        const response = await axios.get(urls.user_profile, { headers });
        setUser(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();
    fetchChats();
  }, [change]);
  const messagesEndRef = useRef(null as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [messages]);

  return (
    <>
      <div
        className="chat-content"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "15px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {messages.map((message) => (
          <ChatBox message={message} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatSend chatID={props.chatID} sended={() => setChange(change+1)} />
    </>
  );
};

export default ChatMessages;
