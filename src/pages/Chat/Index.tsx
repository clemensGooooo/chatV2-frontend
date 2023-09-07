import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { urls, headers, Chat } from "../../env";
import ChatContent from "./Right/Body/Body";
import Left from "./Left/Index";
import Welcome from "./Welcome";

const Main = () => {
  const [chats, setChats] = useState([] as Chat[]);
  const [chatSelected, setChatSelected] = useState(
    undefined as undefined | number
  );
  const [chatChange, setChatChange] = useState(null as null | number);
  const [changed, setChange] = useState(0);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(urls.getChats, { headers });

        const updatedChats = response.data
          .map((chat: Chat) => {
            const oldChat = chats.find((c) => c.chatID === chat.chatID);

            if (oldChat) {
              return {
                ...chat,
                changed:
                  chatChange == chat.chatID
                    ? oldChat.changed + 1
                    : oldChat.changed,
              };
            } else {
              return { ...chat, changed: 0 };
            }
          })
          .sort(
            (a: Chat, b: Chat) =>
              new Date(b.lastInteraction).getTime() -
              new Date(a.lastInteraction).getTime()
          );

        setChats(updatedChats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [changed]);

  return (
    <Paper
      style={{
        maxWidth: 1400,
        display: "flex",
        flex: 1,
        height: "85vh",
        margin: "auto",
        paddingBottom: "0px",
        marginTop: "30px",
        marginBottom: "-15px",
        borderRadius: "30px",
      }}
      elevation={4}
    >
      <Left
        width="30%"
        openChat={(id) => setChatSelected(id)}
        chats={chats}
        newChat={(id) => {
          setChatSelected(id);
          setChange(changed + 1);
        }}
      />
      <div
        style={{
          flex: 1,
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        {chatSelected == undefined ? (
          <Welcome />
        ) : (
          <ChatContent
            chatID={chatSelected}
            majorChange={(id) => {
              setChange(changed + 1);
              if (id == 0) {
                setChatSelected(undefined);
              } else {
                setChatChange(id);
              }
            }}
          />
        )}
      </div>
    </Paper>
  );
};

export default Main;
