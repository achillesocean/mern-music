import { useEffect } from "react";
import { Music, Users, Disc, Tag, Loader2, BarChart3 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchStatisticsRequest } from "../../store/slices/statsSlice";
import { Box, Flex, Grid, Heading, Text } from "../primitives";
import { StatCard } from "./StatCard";
import { StatsList } from "./StatsList";

export const StatisticsDashboard = () => {
  const dispatch = useAppDispatch();
  const {
    data: stats,
    loading,
    error,
  } = useAppSelector((state) => state.statistics);

  // Fetch statistics on mount
  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  if (loading && !stats) {
    return (
      <Flex align="center" justify="center" py={10}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <Text color="muted-foreground" className="ml-3">
          Loading statistics...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={10}
        className="border border-destructive/50 rounded-xl bg-destructive/5"
      >
        <Text color="destructive">Error loading statistics: {error}</Text>
      </Flex>
    );
  }

  if (!stats) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={10}
        className="border-2 border-dashed border-border rounded-xl"
      >
        <div className="p-4 rounded-full bg-muted mb-4">
          <BarChart3 className="h-12 w-12 text-muted-foreground" />
        </div>
        <Heading as="h3" size="lg" className="mb-2">
          No statistics available
        </Heading>
        <Text color="muted-foreground">
          Add some songs to see your library statistics.
        </Text>
      </Flex>
    );
  }

  return (
    <Box py={6}>
      {/* Header */}
      <Flex align="center" gap={3} mb={6}>
        <div className="p-3 rounded-xl bg-primary text-primary-foreground">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <Heading as="h1" size="2xl">
            Library Statistics
          </Heading>
          <Text color="muted-foreground" size="sm">
            Overview of your music collection
          </Text>
        </div>
      </Flex>

      {/* Summary Cards */}
      <Grid columns="repeat(auto-fit, minmax(200px, 1fr))" gap={5} mb={8}>
        <StatCard
          title="Total Songs"
          value={stats.totalSongs}
          icon={Music}
          variant="primary"
        />
        <StatCard
          title="Total Artists"
          value={stats.totalArtists}
          icon={Users}
          variant="default"
        />
        <StatCard
          title="Total Albums"
          value={stats.totalAlbums}
          icon={Disc}
          variant="default"
        />
        <StatCard
          title="Total Genres"
          value={stats.totalGenres}
          icon={Tag}
          variant="default"
        />
      </Grid>

      {/* Detailed Statistics */}
      <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap={5}>
        <StatsList
          title="Songs by Genre"
          data={stats.songsByGenre}
          emptyMessage="No genres found"
        />
        <StatsList
          title="Songs by Artist"
          data={stats.songsByArtist}
          emptyMessage="No artists found"
        />
        <StatsList
          title="Albums by Artist"
          data={stats.albumsByArtist}
          emptyMessage="No albums found"
        />
        <StatsList
          title="Songs by Album"
          data={stats.songsByAlbum}
          emptyMessage="No albums found"
        />
      </Grid>
    </Box>
  );
};
