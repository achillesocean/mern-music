/**
 * =============================================================================
 * SONG CARD COMPONENT
 * =============================================================================
 *
 * Displays a single song with edit and delete actions.
 * Uses our design system primitives for consistent styling.
 */

import { Music, Edit2, Trash2 } from "lucide-react";
import { Card, Flex, Text, Heading } from "../primitives";
import { Button } from "../ui/button";
import type { Song } from "../../types/songTypes";

interface SongCardProps {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}

export const SongCard = ({ song, onEdit, onDelete }: SongCardProps) => {
  return (
    <Card
      p={5}
      className="transition-all duration-200 hover:shadow-md hover:border-primary/30"
    >
      <Flex direction="column" gap={3}>
        {/* Header with icon and title */}
        <Flex align="center" gap={3}>
          <div className="p-2 rounded-lg bg-primary/10">
            <Music className="h-5 w-5 text-primary" />
          </div>
          <Heading as="h3" size="lg" className="truncate flex-1">
            {song.title}
          </Heading>
        </Flex>

        {/* Song details */}
        <Flex direction="column" gap={2} className="mt-1">
          <Flex align="center" gap={2}>
            <Text size="sm" color="muted-foreground" className="w-16">
              Artist:
            </Text>
            <Text size="sm" weight="medium" color="foreground">
              {song.artist}
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Text size="sm" color="muted-foreground" className="w-16">
              Album:
            </Text>
            <Text size="sm" weight="medium" color="foreground">
              {song.album}
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Text size="sm" color="muted-foreground" className="w-16">
              Genre:
            </Text>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
              {song.genre}
            </span>
          </Flex>
        </Flex>

        {/* Actions */}
        <Flex gap={2} className="mt-3 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(song)}
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(song._id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
