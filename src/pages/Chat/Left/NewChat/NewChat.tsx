import {
  Alert,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { headers, urls } from "../../../../env";
import NewChatImage from "../../../../components/Chat/NewChatImage";
import NewChatMembers, { User } from "./NewChatMembers";

interface NewChatProps {
  back: () => void;
  newChat: (id: number) => void;
}

const NewChat = (props: NewChatProps) => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "", error: "", options: [] },
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error_image, setError_image] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");

  const maxNameLength = 50;
  const maxDescriptionLength = 200;
  const maxFileSize = 6 * 1024 * 1024;

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

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setErrorName(false);
    if (newName.length <= maxNameLength) {
      setName(newName);
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    if (newDescription.length <= maxDescriptionLength) {
      setDescription(newDescription);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.size <= maxFileSize) {
        setSelectedImage(selectedFile);
        setError_image("");
      } else {
        setSelectedImage(null);
        setError_image("File size exceeds the maximum limit of 6 MB.");
      }
    }
  };

  const handleUsersChange = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
  };

  const create = async () => {
    if (name == "") {
      return setErrorName(true);
    }

    let allNamesValid = true;

    const updatedUsers = users.map((user) => {
      if (user.name.trim() === "") {
        allNamesValid = false;
        return { ...user, error: "A name is required" };
      } else {
        return { ...user, error: "" };
      }
    });

    if (!allNamesValid) {
      setUsers(updatedUsers);
      return;
    }

    const members = updatedUsers.map((user) => user.name);
    members.push(user);
    const body = {
      name: name,
      members: members,
      chatText: description,
    };
    try {
      let response = await axios.post(urls.createChat, body, { headers });
      const chatID = response.data.id;
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        formData.append("chatID", chatID);
        try {
          const response = await axios.post(urls.uploadGroupImage, formData, {
            headers: { ...headers, "Content-Type": "multipart/form-data" },
          });
        } catch (error) {
          console.error("Upload error", error);
        }
      }
      props.newChat(chatID);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        overflowY: "scroll",
        opacity: 1,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: "10px",
        }}
      >
        Create new chat
        <Button
          color="error"
          sx={{
            position: "absolute",
            right: "0",
            margin: "0px 10px",
            zIndex: 3,
          }}
          onClick={props.back}
        >
          Back
        </Button>
      </Typography>

      <Box sx={{ margin: "10px", marginTop: "20px" }}>
        <Typography variant="subtitle2">Name</Typography>
        <TextField
          label="Name for your chat"
          variant="filled"
          fullWidth
          required
          value={name}
          error={errorName}
          helperText={errorName ? "Please enter a name!" : undefined}
          onChange={handleNameChange}
          inputProps={{ maxLength: maxNameLength }}
        />
        <Typography
          variant="caption"
          color={name.length > maxNameLength ? "error" : "textSecondary"}
        >
          {`${name.length}/${maxNameLength} characters`}
        </Typography>
        <br />
        <br />
        <Typography variant="subtitle2">Description</Typography>
        <TextField
          variant="filled"
          fullWidth
          multiline
          label="Some words to this chat"
          minRows={3}
          value={description}
          onChange={handleDescriptionChange}
          inputProps={{ maxLength: maxDescriptionLength }}
        />
        <Typography
          variant="caption"
          color={
            description.length > maxDescriptionLength
              ? "error"
              : "textSecondary"
          }
        >
          {`${description.length}/${maxDescriptionLength} characters`}
        </Typography>
      </Box>

      <Box sx={{ margin: "10px", marginTop: "20px" }}>
        <Typography variant="subtitle2">Upload Image</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-upload"
        />
        {selectedImage == null ? (
          <label htmlFor="image-upload">
            {error_image != "" ? (
              <Typography color="error">{error_image}</Typography>
            ) : (
              <> </>
            )}
            <Button component="span" variant="contained" color="primary">
              Choose Image
            </Button>
          </label>
        ) : (
          <>
            {selectedImage && (
              <Box sx={{ marginTop: "10px" }}>
                <label htmlFor="image-upload">
                  <NewChatImage url={URL.createObjectURL(selectedImage)} />
                </label>
              </Box>
            )}
          </>
        )}
      </Box>
      <Box sx={{ padding: "10px" }}>
        <Typography variant="subtitle2">Members</Typography>
        <NewChatMembers
          users={users}
          setUsers={handleUsersChange}
          user={user}
        />
      </Box>
      <Box
        sx={{
          margin: "10px",
        }}
      >
        {error ? "There was an error while creating" : ""}
      </Box>
      <Button
        variant="contained"
        color="success"
        sx={{
          margin: "30px 10px",
        }}
        onClick={create}
      >
        Create
      </Button>
    </div>
  );
};
export default NewChat;
