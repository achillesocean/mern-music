import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { Card } from "../../components/Base/Card";
import { Box } from "../../components/Base/Box";
import StatsList from "./StatsList";
import { fetchStatsRequest } from "../../store/slices/statsSlice";

const StatsPanel: React.FC = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useAppSelector((state) => state.stats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  return (
    <Card p={4} height="fit-content">
      <Box as="h3" mb={4} color="text">
        🚀 Overall Statistics
      </Box>

      {isLoading && <p>Calculating stats...</p>}
      {error && <p style={{ color: "red" }}>Error loading stats.</p>}
      {stats && (
        <Box>
          <StatItem label="Total Songs" value={stats.overall.totalSongs} />
          <StatItem label="Unique Artists" value={stats.overall.totalArtists} />
          <StatItem label="Unique Albums" value={stats.overall.totalAlbums} />
          <StatItem label="Unique Genres" value={stats.overall.totalGenres} />

          <StatsList
            title="Songs Per Genre"
            data={stats.songsPerGenre}
            keyField="genre"
            valueField="count"
          />

          <StatsList
            title="Songs/Albums Per Artist"
            data={stats.songsAlbumsPerArtist}
            keyField="artist"
            valueField="songCount"
          />

          <StatsList
            title="Songs Per Album"
            data={stats.songsPerAlbum}
            keyField="album"
            valueField="songCount"
          />
        </Box>
      )}
    </Card>
  );
};

const StatItem: React.FC<{
  label: string;
  value: number;
  fontSize?: number;
}> = ({ label, value, fontSize = 3 }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    py={2}
    borderBottom="1px solid #eee"
  >
    <Box color="textMuted" fontSize={fontSize}>
      {label}
    </Box>
    <Box fontWeight="bold" fontSize={fontSize}>
      {value}
    </Box>
  </Box>
);

export default StatsPanel;
