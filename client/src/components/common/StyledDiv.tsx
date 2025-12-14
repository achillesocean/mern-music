import styled from "@emotion/styled";
import {
  space,
  color,
  typography,
  type SpaceProps,
  type ColorProps,
  type TypographyProps,
} from "styled-system";

type StyledDivProps = SpaceProps & ColorProps & TypographyProps;

export const StyledDiv = styled.div<StyledDivProps>`
  box-sizing: border-box;
  /* Apply styles based on props defined by styled-system */
  ${space}
  ${color}
    ${typography}
`;
