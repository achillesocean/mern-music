// client/src/features/songs/SongListContainer.tsx

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchSongsRequest } from "../../store/slices/songsSlice";
import { fetchStatsRequest } from "../../store/slices/statsSlice";
import { type ISong } from "../../types/songTypes";

// Modular UI Components
import { Card } from "../../components/Base/Card";
import { Box } from "../../components/Base/Box";
import SongItem from "./SongItem";
import SongForm from "./SongForm";

const SongListContainer: React.FC = () => {
  const [editingSong, setEditingSong] = useState<ISong | null>(null);

  const {
    list: songs,
    isLoading,
    error,
  } = useAppSelector((state) => state.songs);
  const dispatch = useAppDispatch();

  // Function passed to SongItem to trigger edit mode
  const handleEdit = (song: ISong) => {
    setEditingSong(song);
  };

  // Function to exit edit mode (passed to SongForm)
  const handleCancelEdit = () => {
    setEditingSong(null);
  };

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchSongsRequest());
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  // If a song is being edited, render the form instead of the list
  if (editingSong) {
    return (
      <Card p={4} mb={5}>
        <Box as="h2" mb={3} color="primary">
          Edit Song: {editingSong.title}
        </Box>
        {/* Render the SongForm in update mode */}
        <SongForm songToEdit={editingSong} onSave={handleCancelEdit} />
        <Box mt={3}>
          <a href="#" onClick={handleCancelEdit}>
            Cancel Edit
          </a>
        </Box>
      </Card>
    );
  }

  return (
    <Card p={4}>
      <Box as="h2" mb={4} fontSize={4} color="text">
        🎶 Song Library ({songs.length} total)
      </Box>

      {isLoading && (
        <Box p={3} color="textMuted">
          Loading songs...
        </Box>
      )}
      {error && (
        <Box p={3} color="error" fontWeight="bold">
          Error: {error}
        </Box>
      )}

      {songs.length === 0 && !isLoading && (
        <Box p={3} color="textMuted" fontStyle="italic">
          No songs found. Add your picks!
        </Box>
      )}

      <Box>
        {songs.map((song) => (
          // Use the designed SongItem component
          <SongItem key={song._id} song={song} onEdit={handleEdit} />
        ))}
      </Box>
    </Card>
  );
};

export default SongListContainer;
