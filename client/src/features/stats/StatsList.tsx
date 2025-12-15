// client/src/features/stats/StatsList.tsx

import React from "react";
import { Box } from "../../components/Base/Box";
// import { type IStats } from "../../types/songTypes";

interface StatsListProps<T extends object> {
  title: string;
  // Generic type for a list of stat items (e.g., genre/count, artist/albumCount)
  data: T[];
  keyField: keyof T;
  valueField: keyof T;
}

const StatsList = <T extends object>({
  title,
  data,
  keyField,
  valueField,
}: StatsListProps<T>) => {
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
          {/* The keyField and valueField props are now guaranteed by TS to be keys of 'item' */}
          <Box color="textMuted">{item[keyField] as React.ReactNode}</Box>
          <Box fontWeight="bold">{item[valueField] as React.ReactNode}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatsList;
