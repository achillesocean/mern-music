import React from "react";
import { Box } from "../Base/Box";

export const AppLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => (
  <Box bg="background" minHeight="100vh" py={6} px={5}>
    {children}
  </Box>
);
