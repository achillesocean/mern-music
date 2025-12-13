import styled from "@emotion/styled";
import { space, type SpaceProps } from "styled-system";

export const StyledButton = styled.button<SpaceProps>`
  /* Basic styles */
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* Apply styled-system props */
  ${space}
  /* Add hover/focus animations */
    transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
