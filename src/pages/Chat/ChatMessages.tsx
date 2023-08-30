import { useEffect, useRef } from "react";
import { Message } from "./ChatContent";
import ChatBox from "./Message";

interface FProps {
  messages: Message[];
  user: string;
}
const ChatMessages = (props: FProps) => {
  const messagesEndRef = useRef(null as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setTimeout(() => {
        scrollToBottom()
    }, 200);
  }, [props.messages]);

  return (
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
      {props.messages.map((message) => (
        <ChatBox message={message} user={props.user} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
