import { useState } from "react";
import { Container, Box } from "../components/primitives";
import { Header } from "../components/layout/index";
import { SongList } from "../components/songs/index";
import { StatisticsDashboard } from "../components/statistics/index";
import { Toaster } from "../components/ui/toaster";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"songs" | "statistics">("songs");

  return (
    <Box minHeight="100vh" bg="background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main>
        <Container py={6}>
          {activeTab === "songs" ? <SongList /> : <StatisticsDashboard />}
        </Container>
      </main>

      <Toaster />
    </Box>
  );
};

export default Index;
