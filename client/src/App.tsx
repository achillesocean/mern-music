// client/src/App.tsx (Main Content Area)

import React from "react";
import { AppLayout } from "./components/Layout/AppLayout";
import { Box } from "./components/Base/Box";
import StatsPanel from "./features/stats/StatsPanel";
import SongListContainer from "./features/songs/SongListContainer"; // To be created
import SongForm from "./features/songs/SongForm"; // To be created
import { Card } from "./components/Base/Card";

import GlobalStyles from "./theme/GlobalStyles";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppLayout>
        <Box as="h1" fontSize={5} color="primary" mb={5}>
          🎶 MERN Music Manager
        </Box>

        {/* Layout: Grid/Flex for Stats and Main Content */}
        <Box
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "3fr 1fr"]}
          gridGap={5}
        >
          {/* 1. Main Content Area: Form + List */}
          <Box>
            <Card p={4} mb={5}>
              <SongForm />
            </Card>

            <SongListContainer />
          </Box>

          {/* 2. Statistics Panel */}
          <StatsPanel />
        </Box>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
