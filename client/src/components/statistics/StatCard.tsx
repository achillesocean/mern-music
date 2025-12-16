import { type LucideIcon } from "lucide-react";
import { Card, Flex, Text, Heading } from "../primitives";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "primary" | "secondary";
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  variant = "default",
}: StatCardProps) => {
  const bgClasses = {
    default: "bg-muted/50",
    primary: "bg-primary/10",
    secondary: "bg-secondary",
  };

  const iconClasses = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary-foreground",
  };

  return (
    <Card p={5} className="transition-all duration-200 hover:shadow-md">
      <Flex align="flex-start" justify="space-between">
        <div>
          <Text size="sm" color="muted-foreground" className="mb-1 block">
            {title}
          </Text>
          <Heading as="h3" size="3xl" className="mb-1">
            {value}
          </Heading>
          {description && (
            <Text size="xs" color="muted-foreground">
              {description}
            </Text>
          )}
        </div>
        <div className={`p-3 rounded-xl ${bgClasses[variant]}`}>
          <Icon className={`h-6 w-6 ${iconClasses[variant]}`} />
        </div>
      </Flex>
    </Card>
  );
};
