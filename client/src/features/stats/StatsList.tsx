// client/src/features/stats/StatsList.tsx

import React from "react";
import { Box } from "../../components/Base/Box";
import { type IStats } from "../../types/songTypes";

interface StatsListProps {
  title: string;
  // Generic type for a list of stat items (e.g., genre/count, artist/albumCount)
  data: Array<any>;
  keyField: keyof IStats["songsPerGenre"]; // e.g., 'genre'
  valueField: keyof IStats["songsPerGenre"]; // e.g., 'count'
}

const StatsList: React.FC<StatsListProps> = ({
  title,
  data,
  keyField,
  valueField,
}) => {
  if (!data || data.length === 0) return null;

  return (
    <Box mt={4}>
      <Box
        as="h4"
        mb={2}
        fontSize={2}
        color="primary"
        borderBottom="1px solid #eee"
        pb={1}
      >
        {title}
      </Box>
      {data.map((item, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          py={1}
          fontSize={1}
        >
          <Box color="textMuted">{item[keyField]}</Box>
          <Box fontWeight="bold">{item[valueField]}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatsList;
