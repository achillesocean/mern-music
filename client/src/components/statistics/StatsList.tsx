import { Card, Flex, Text, Heading, Box } from "../primitives";

interface StatsListProps {
  title: string;
  data: Record<string, number>;
  emptyMessage?: string;
}

export const StatsList = ({
  title,
  data,
  emptyMessage = "No data available",
}: StatsListProps) => {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <Card p={5} className="h-full">
      <Heading as="h3" size="lg" className="mb-4">
        {title}
      </Heading>

      {entries.length === 0 ? (
        <Text color="muted-foreground" size="sm">
          {emptyMessage}
        </Text>
      ) : (
        <Box className="space-y-3">
          {entries.map(([name, count]) => {
            const percentage = total > 0 ? (count / total) * 100 : 0;

            return (
              <div key={name}>
                <Flex justify="space-between" className="mb-1">
                  <Text
                    size="sm"
                    weight="medium"
                    truncate
                    className="max-w-[70%]"
                  >
                    {name}
                  </Text>
                  <Text size="sm" color="muted-foreground">
                    {count}
                  </Text>
                </Flex>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </Box>
      )}
    </Card>
  );
};
