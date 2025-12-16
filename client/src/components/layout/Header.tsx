import { Music2 } from "lucide-react";
import { Flex, Heading } from "../primitives";

interface HeaderProps {
  activeTab: "songs" | "statistics";
  onTabChange: (tab: "songs" | "statistics") => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Flex
        align="center"
        justify="space-between"
        px={6}
        py={4}
        className="max-w-7xl mx-auto"
      >
        {/* Logo */}
        <Flex align="center" gap={3}>
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <Music2 className="h-5 w-5" />
          </div>
          <Heading as="h1" size="xl">
            Addis Music
          </Heading>
        </Flex>

        {/* Navigation Tabs */}
        <nav>
          <Flex gap={1} className="p-1 bg-muted rounded-lg">
            <button
              onClick={() => onTabChange("songs")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === "songs"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Songs
            </button>
            <button
              onClick={() => onTabChange("statistics")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === "statistics"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Statistics
            </button>
          </Flex>
        </nav>
      </Flex>
    </header>
  );
};
