import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { headers, urls } from "../../../../env";

interface EditableFieldProps {
  label: string;
  initialValue: string;
  onSave: (newValue: string) => Promise<void>;
  multiline?: boolean;
  maxChars?: number;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  initialValue,
  multiline,
  onSave,
  maxChars,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [originalValue, setOriginalValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      await onSave(value);
      setOriginalValue(value);
      setIsEditing(false);
      setError(null); // Reset the error if saving succeeds
    } catch (error) {
      setError("An error occurred while saving."); // Set the error message
    }
  };

  const handleChange = (newValue: string) => {
    if (!maxChars || newValue.length <= maxChars) {
      setValue(newValue);
      setError(null); // Clear the error message when input is within limits
    } else {
      setError(`Maximum ${maxChars} characters allowed.`);
    }
  };

  return (
    <>
      <Typography variant="subtitle2">{label}</Typography>
      <TextField
        value={value}
        variant="filled"
        disabled={!isEditing}
        onChange={(e) => handleChange(e.target.value)}
        multiline={multiline}
        sx={{
          marginBottom: multiline ? "0px" : "40px",
          marginTop: "10px",
        }}
        onBlur={() => {
          if (originalValue === value) setIsEditing(false);
        }}
        rows={multiline ? 3 : undefined}
        fullWidth
        helperText={
          error || `${value.length}/${maxChars} characters`
        }
        error={Boolean(error)}
        InputProps={{
          endAdornment: (
            <>
              {!isEditing && (
                <Button
                  size="small"
                  color="warning"
                  onClick={() => setIsEditing(true)}
                >
                  Change
                </Button>
              )}
            </>
          ),
        }}
      />
      {originalValue !== value && (
        <Button
          size="small"
          color="warning"
          sx={{ margin: "13px" }}
          variant="contained"
          onClick={handleSave}
        >
          Apply changes
        </Button>
      )}
    </>
  );
};

interface DescriptionProps {
  description: string;
  chatID: number;
}

const Description: React.FC<DescriptionProps> = ({ description, chatID }) => {
  const handleSaveDescription = async (newDescription: string) => {
    const body = {
      text: newDescription,
      chatID: chatID,
    };
    await axios.put(urls.editDescription, body, { headers });
  };

  return (
    <EditableField
      label="Description"
      initialValue={description}
      onSave={handleSaveDescription}
      multiline
      maxChars={200}
    />
  );
};

interface NameProps {
  name: string;
  chatID: number;
}

const Name: React.FC<NameProps> = ({ name, chatID }) => {
  const handleSaveName = async (newName: string) => {
    const body = {
      newName: newName,
      chatID: chatID,
    };
    await axios.put(urls.editName, body, { headers });
  };

  return (
    <EditableField
      label="Name"
      initialValue={name}
      onSave={handleSaveName}
      maxChars={50}
    />
  );
};

export { Description, Name };
