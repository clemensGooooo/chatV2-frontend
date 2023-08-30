import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { headers, urls } from "../../../env";

export interface User {
  id: number;
  name: string;
  error: string;
  options: string[];
}

interface NewChatMembersProps {
  users: User[];
  user: string;
  setUsers: (updatedUsers: User[]) => void;
}

const NewChatMembers = (props: NewChatMembersProps) => {
  const { users, setUsers } = props;

  const [lastId, setLastId] = useState(1);

  const addUser = () => {
    const newUser: User = { id: lastId + 1, name: "", error: "", options: [] };
    setLastId(lastId + 1);
    setUsers([...users, newUser]);
  };

  const removeUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleNameChange = (id: number, newName: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name: newName, error: "" } : user
    );
    setUsers(updatedUsers);
  };

  const handleAutocompleteChange = async (id: number, newName: string) => {
    handleNameChange(id, newName);
    if (newName.length >= 2) {
      try {
        let response = await axios.get(urls.getUsers, {
          headers,
          params: { name: newName },
        });

        const optionsSet = new Set<string>();

        users.forEach((obj) => {
          optionsSet.add(obj.name);
        });

        const options = response.data
          .filter((str: string) => !optionsSet.has(str))
          .filter((item: string) => item !== props.user);

        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, options: options } : user
        );
        setUsers(updatedUsers);
      } catch (error) {
        console.log(error);
      }
    } else {
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, options: [] } : user
      );
      setUsers(updatedUsers);
    }
  };

  return (
    <div>
      {users.map((user, index) => (
        <Box key={user.id} display="flex" alignItems="center" marginBottom={1}>
          <Autocomplete
            disablePortal
            options={user.options}
            sx={{ width: 300 }}
            onChange={(e, value) => {
              if (value) handleNameChange(user.id, value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="User Name"
                value={user.name}
                onChange={(e) =>
                  handleAutocompleteChange(user.id, e.target.value)
                }
                variant="filled"
                fullWidth
                error={user.error !== ""}
                helperText={user.error}
              />
            )}
          />
          {users.length > 1 && (
            <IconButton onClick={() => removeUser(user.id)}>
              <RemoveCircleOutline />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={addUser}
        sx={{ margin: "5px 10px" }}
      >
        Add User
      </Button>
    </div>
  );
};

export default NewChatMembers;
