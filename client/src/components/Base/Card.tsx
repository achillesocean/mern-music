import styled from "@emotion/styled";
import { Box } from "./Box";

export const Card = styled(Box)`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;
