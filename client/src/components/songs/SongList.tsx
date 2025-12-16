import { useEffect, useState } from "react";
import { Plus, Music, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchSongsRequest,
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
} from "../../store/slices/songsSlice";
import { Box, Flex, Grid, Heading, Text } from "../primitives";
import { Button } from "../ui/button";
import { SongCard } from "./SongCard";
import { SongForm } from "./SongForm";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import type { Song, CreateSongPayload } from "../../types/songTypes";
import { toast } from "sonner";

export const SongList = () => {
  const dispatch = useAppDispatch();
  const { songs, loading, error } = useAppSelector((state) => state.songs);
  // Local state for modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [deletingSongId, setDeletingSongId] = useState<string | null>(null);

  // Fetch songs on mount
  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast("Error", {
        description: error,
      });
    }
  }, [error, toast]);

  // Handlers
  const handleAddNew = () => {
    setEditingSong(null);
    setIsFormOpen(true);
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingSongId(id);
  };

  const handleFormSubmit = (data: CreateSongPayload) => {
    if (editingSong) {
      dispatch(updateSongRequest({ _id: editingSong._id, ...data }));
      toast("Song Updated", {
        description: `"${data.title}" has been updated successfully.`,
      });
    } else {
      dispatch(createSongRequest(data));
      toast("Song Added", {
        description: `"${data.title}" has been added to your library.`,
      });
    }
    setIsFormOpen(false);
    setEditingSong(null);
  };

  const handleConfirmDelete = () => {
    if (deletingSongId) {
      const songToDelete = songs.find((s) => s._id === deletingSongId);
      dispatch(deleteSongRequest(deletingSongId));
      toast("Song Deleted", {
        description: `"${songToDelete?.title}" has been removed.`,
      });
      setDeletingSongId(null);
    }
  };

  return (
    <Box py={6}>
      {/* Header */}
      <Flex align="center" justify="space-between" mb={6}>
        <Flex align="center" gap={3}>
          <div className="p-3 rounded-xl bg-primary text-primary-foreground">
            <Music className="h-6 w-6" />
          </div>
          <div>
            <Heading as="h1" size="2xl">
              My Music Library
            </Heading>
            <Text color="muted-foreground" size="sm">
              {songs.length} {songs.length === 1 ? "song" : "songs"} in your
              collection
            </Text>
          </div>
        </Flex>
        <Button onClick={handleAddNew} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Song
        </Button>
      </Flex>

      {/* Loading State */}
      {loading && songs.length === 0 && (
        <Flex align="center" justify="center" py={10}>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <Text color="muted-foreground" className="ml-3">
            Loading songs...
          </Text>
        </Flex>
      )}

      {/* Empty State */}
      {!loading && songs.length === 0 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={10}
          className="border-2 border-dashed border-border rounded-xl"
        >
          <div className="p-4 rounded-full bg-muted mb-4">
            <Music className="h-12 w-12 text-muted-foreground" />
          </div>
          <Heading as="h3" size="lg" className="mb-2">
            No songs yet
          </Heading>
          <Text color="muted-foreground" className="mb-4">
            Start building your music library by adding your first song.
          </Text>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Song
          </Button>
        </Flex>
      )}

      {/* Songs Grid */}
      {songs.length > 0 && (
        <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap={5}>
          {songs.map((song) => (
            <SongCard
              key={song._id}
              song={song}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Grid>
      )}

      {/* Song Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
          <SongForm
            song={editingSong}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
            isLoading={loading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingSongId}
        onOpenChange={() => setDeletingSongId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Song</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this song? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
