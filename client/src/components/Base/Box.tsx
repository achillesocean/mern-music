import styled from "@emotion/styled";
import {
  space,
  color,
  layout,
  flexbox,
  type SpaceProps,
  type ColorProps,
  type LayoutProps,
  type FlexboxProps,
} from "styled-system";

type BoxProps = SpaceProps & ColorProps & LayoutProps & FlexboxProps;

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`;
