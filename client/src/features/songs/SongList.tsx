import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchSongsRequest } from "../../store/slices/songsSlice";
import { fetchStatsRequest } from "../../store/slices/statsSlice";
import { StyledDiv } from "../../components/common/StyledDiv";

const SongList: React.FC = () => {
  const {
    list: songs,
    isLoading,
    error,
  } = useAppSelector((state) => state.songs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch the request action, which is caught by the saga
    dispatch(fetchSongsRequest());
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  if (isLoading) return <p>Loading songs...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (songs.length === 0) return <p>No songs found. Add your picks!</p>;

  return (
    <StyledDiv p={4} bg="lightgray">
      <h2>Song Library ({songs.length} total)</h2>
      {songs.map((song) => (
        <div key={song._id}>
          <strong>{song.title}</strong> by {song.artist} ({song.genre})
        </div>
      ))}
    </StyledDiv>
  );
};

export default SongList;
