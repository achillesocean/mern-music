import styled from "@emotion/styled";
import {
  space,
  color,
  layout,
  flexbox,
  typography,
  border,
  grid,
  type SpaceProps,
  type ColorProps,
  type LayoutProps,
  type FlexboxProps,
  type TypographyProps,
  type BorderProps,
  type GridProps,
} from "styled-system";

type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  TypographyProps &
  BorderProps &
  GridProps;

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${typography}
  ${border}
  ${grid}
`;
