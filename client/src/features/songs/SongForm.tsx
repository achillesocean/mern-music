// client/src/features/songs/SongForm.tsx

import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { type ISong } from "../../types/songTypes";
import {
  createSongRequest,
  updateSongRequest,
} from "../../store/slices/songsSlice";
import { Box } from "../../components/Base/Box";
import { Button } from "../../components/Base/Button";

// Type for the initial form state (excluding DB-generated fields)
type FormFields = Omit<ISong, "_id" | "createdAt" | "updatedAt">;

interface SongFormProps {
  songToEdit?: ISong | null; // Optional prop for update mode
  onSave?: () => void; // Callback to close the form/edit mode
}

const initialFormState: FormFields = {
  title: "",
  artist: "",
  album: "",
  genre: "",
};

const SongForm: React.FC<SongFormProps> = ({ songToEdit, onSave }) => {
  const dispatch = useAppDispatch();
  const isUpdateMode = !!songToEdit;

  // Local state for form inputs
  const [formData, setFormData] = useState<FormFields>(initialFormState);

  // Effect to populate form when switching to update mode
  useEffect(() => {
    if (songToEdit) {
      // Destructure to ensure we only copy the FormFields (not _id, etc.)
      const { title, artist, album, genre } = songToEdit;
      setFormData({ title, artist, album, genre });
    } else {
      setFormData(initialFormState); // Reset for create mode
    }
  }, [songToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdateMode && songToEdit) {
      // **UPDATE FLOW**: Dispatch update action
      const fullSong: ISong = { ...songToEdit, ...formData };
      dispatch(updateSongRequest(fullSong));
    } else {
      // **CREATE FLOW**: Dispatch create action
      dispatch(createSongRequest(formData));
    }

    // Cleanup
    if (onSave) {
      onSave(); // Close the form if it was in edit mode
    } else {
      setFormData(initialFormState); // Reset form for next creation
    }
  };

  // A simple styled input component for modularity
  const Input = (props: React.ComponentPropsWithoutRef<"input">) => (
    <Box
      as="input"
      p={2}
      border="1px solid"
      borderColor="#ddd"
      borderRadius="4px"
      width="100%"
      {...props}
      mb={3}
    />
  );

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      display="grid"
      gridTemplateColumns={["1fr", "1fr 1fr"]}
      gridGap={3}
    >
      <Input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Input
        name="artist"
        placeholder="Artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />
      <Input
        name="album"
        placeholder="Album"
        value={formData.album}
        onChange={handleChange}
        required
      />
      <Input
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <Box gridColumn={isUpdateMode ? "1 / 3" : "1 / 3"} mt={2}>
        <Button variant="primary" type="submit">
          {isUpdateMode ? "Update Song" : "Add New Song"}
        </Button>
      </Box>
    </Box>
  );
};

export default SongForm;
