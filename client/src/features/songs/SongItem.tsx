import React from "react";
import { type ISong } from "../../types/songTypes";
import { Card } from "../../components/Base/Card";
import { Box } from "../../components/Base/Box";
import { Button } from "../../components/Base/Button";
import { useAppDispatch } from "../../hooks/redux";
import { deleteSongRequest } from "../../store/slices/songsSlice";

interface SongItemProps {
  song: ISong;
  onEdit: (song: ISong) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onEdit }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
      dispatch(deleteSongRequest(song._id));
    }
  };

  return (
    <Card
      p={3}
      my={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Metadata Section */}
      <Box>
        <Box fontWeight="bold" color="primary" fontSize={3}>
          {song.title}
        </Box>
        <Box fontSize={1} color="textMuted">
          {song.artist} | {song.album} ({song.genre})
        </Box>
      </Box>

      {/* Actions Section */}
      <Box display="flex" gridGap={3}>
        <Button variant="secondary" onClick={() => onEdit(song)}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default SongItem;
