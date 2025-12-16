import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Music, X } from "lucide-react";
import { Card, Flex, Heading, Text } from "../primitives";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Song, CreateSongPayload } from "../../types/songTypes";

// Validation schema
const songSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  artist: z.string().min(1, "Artist is required").max(100),
  album: z.string().min(1, "Album is required").max(100),
  genre: z.string().min(1, "Genre is required"),
});

type SongFormData = z.infer<typeof songSchema>;

// Predefined genres for the select dropdown
const GENRES = [
  "Rock",
  "Pop",
  "Jazz",
  "Classical",
  "Hip Hop",
  "R&B",
  "Country",
  "Electronic",
  "Blues",
  "Reggae",
  "Metal",
  "Folk",
  "Soul",
  "Punk",
  "Alternative",
];

interface SongFormProps {
  song?: Song | null; // If provided, we're editing; otherwise creating
  onSubmit: (data: CreateSongPayload) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SongForm = ({
  song,
  onSubmit,
  onCancel,
  isLoading,
}: SongFormProps) => {
  const isEditing = !!song;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genre: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (song) {
      reset({
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
      });
    }
  }, [song, reset]);

  const onFormSubmit = (data: SongFormData) => {
    onSubmit({
      title: data.title,
      artist: data.artist,
      album: data.album,
      genre: data.genre,
    });
  };

  const selectedGenre = watch("genre");

  return (
    <Card p={6} className="w-full max-w-md mx-auto">
      <Flex direction="column" gap={5}>
        {/* Header */}
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <div className="p-2 rounded-lg bg-primary/10">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <Heading as="h2" size="xl">
              {isEditing ? "Edit Song" : "Add New Song"}
            </Heading>
          </Flex>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </Flex>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter song title"
              {...register("title")}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <Text size="xs" color="destructive">
                {errors.title.message}
              </Text>
            )}
          </div>

          {/* Artist */}
          <div className="space-y-2">
            <Label htmlFor="artist">Artist</Label>
            <Input
              id="artist"
              placeholder="Enter artist name"
              {...register("artist")}
              className={errors.artist ? "border-destructive" : ""}
            />
            {errors.artist && (
              <Text size="xs" color="destructive">
                {errors.artist.message}
              </Text>
            )}
          </div>

          {/* Album */}
          <div className="space-y-2">
            <Label htmlFor="album">Album</Label>
            <Input
              id="album"
              placeholder="Enter album name"
              {...register("album")}
              className={errors.album ? "border-destructive" : ""}
            />
            {errors.album && (
              <Text size="xs" color="destructive">
                {errors.album.message}
              </Text>
            )}
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={selectedGenre}
              onValueChange={(value) => setValue("genre", value)}
            >
              <SelectTrigger
                className={errors.genre ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.genre && (
              <Text size="xs" color="destructive">
                {errors.genre.message}
              </Text>
            )}
          </div>

          {/* Actions */}
          <Flex gap={3} className="pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Song" : "Add Song"}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
};
