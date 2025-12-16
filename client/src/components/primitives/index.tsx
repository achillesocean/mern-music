import styled from "@emotion/styled";
import { css } from "@emotion/react";

// DESIGN TOKENS - Single source of truth for all design values
export const tokens = {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128],

  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  radii: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },

  transitions: {
    fast: "150ms ease",
    normal: "200ms ease",
    slow: "300ms ease",
  },
};

// HELPER FUNCTIONS - Convert prop values to CSS
// Convert spacing index to actual pixels
const getSpace = (value: number | string | undefined): string => {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  return `${tokens.space[value] || 0}px`;
};

// BOX COMPONENT - The foundational primitive
interface BoxProps {
  // Spacing
  p?: number | string; // padding
  px?: number | string; // padding-left & padding-right
  py?: number | string; // padding-top & padding-bottom
  pt?: number | string; // padding-top
  pb?: number | string; // padding-bottom
  pl?: number | string; // padding-left
  pr?: number | string; // padding-right
  m?: number | string; // margin
  mx?: number | string; // margin-left & margin-right
  my?: number | string; // margin-top & margin-bottom
  mt?: number | string; // margin-top
  mb?: number | string; // margin-bottom
  ml?: number | string; // margin-left
  mr?: number | string; // margin-right

  // Sizing
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;

  // Layout
  display?: string;
  overflow?: string;
  position?: "relative" | "absolute" | "fixed" | "sticky";

  // Appearance
  bg?: string; // background-color (uses CSS variable)
  borderRadius?: keyof typeof tokens.radii | string;
  shadow?: keyof typeof tokens.shadows;
  border?: string;
}

export const Box = styled.div<BoxProps>`
  ${({ p }) =>
    p !== undefined &&
    css`
      padding: ${getSpace(p)};
    `}
  ${({ px }) =>
    px !== undefined &&
    css`
      padding-left: ${getSpace(px)};
      padding-right: ${getSpace(px)};
    `}
  ${({ py }) =>
    py !== undefined &&
    css`
      padding-top: ${getSpace(py)};
      padding-bottom: ${getSpace(py)};
    `}
  ${({ pt }) =>
    pt !== undefined &&
    css`
      padding-top: ${getSpace(pt)};
    `}
  ${({ pb }) =>
    pb !== undefined &&
    css`
      padding-bottom: ${getSpace(pb)};
    `}
  ${({ pl }) =>
    pl !== undefined &&
    css`
      padding-left: ${getSpace(pl)};
    `}
  ${({ pr }) =>
    pr !== undefined &&
    css`
      padding-right: ${getSpace(pr)};
    `}
  
  ${({ m }) =>
    m !== undefined &&
    css`
      margin: ${getSpace(m)};
    `}
  ${({ mx }) =>
    mx !== undefined &&
    css`
      margin-left: ${getSpace(mx)};
      margin-right: ${getSpace(mx)};
    `}
  ${({ my }) =>
    my !== undefined &&
    css`
      margin-top: ${getSpace(my)};
      margin-bottom: ${getSpace(my)};
    `}
  ${({ mt }) =>
    mt !== undefined &&
    css`
      margin-top: ${getSpace(mt)};
    `}
  ${({ mb }) =>
    mb !== undefined &&
    css`
      margin-bottom: ${getSpace(mb)};
    `}
  ${({ ml }) =>
    ml !== undefined &&
    css`
      margin-left: ${getSpace(ml)};
    `}
  ${({ mr }) =>
    mr !== undefined &&
    css`
      margin-right: ${getSpace(mr)};
    `}
  
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth};
    `}
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${minHeight};
    `}
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight};
    `}
  
  ${({ display }) =>
    display &&
    css`
      display: ${display};
    `}
  ${({ overflow }) =>
    overflow &&
    css`
      overflow: ${overflow};
    `}
  ${({ position }) =>
    position &&
    css`
      position: ${position};
    `}
  
  ${({ bg }) =>
    bg &&
    css`
      background-color: hsl(var(--${bg}));
    `}
  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${tokens.radii[
        borderRadius as keyof typeof tokens.radii
      ] || borderRadius};
    `}
  ${({ shadow }) =>
    shadow &&
    css`
      box-shadow: ${tokens.shadows[shadow]};
    `}
  ${({ border }) =>
    border &&
    css`
      border: ${border};
    `}
`;

// FLEX COMPONENT - Box with flexbox

interface FlexProps extends BoxProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number | string;
  flex?: string;
}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}
  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `}
  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}
  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: ${wrap};
    `}
  ${({ gap }) =>
    gap !== undefined &&
    css`
      gap: ${getSpace(gap)};
    `}
  ${({ flex }) =>
    flex &&
    css`
      flex: ${flex};
    `}
`;

// GRID COMPONENT - Box with CSS Grid
interface GridProps extends BoxProps {
  columns?: string | number;
  rows?: string;
  gap?: number | string;
  columnGap?: number | string;
  rowGap?: number | string;
}

export const Grid = styled(Box)<GridProps>`
  display: grid;
  ${({ columns }) =>
    columns &&
    css`
      grid-template-columns: ${typeof columns === "number"
        ? `repeat(${columns}, 1fr)`
        : columns};
    `}
  ${({ rows }) =>
    rows &&
    css`
      grid-template-rows: ${rows};
    `}
  ${({ gap }) =>
    gap !== undefined &&
    css`
      gap: ${getSpace(gap)};
    `}
  ${({ columnGap }) =>
    columnGap !== undefined &&
    css`
      column-gap: ${getSpace(columnGap)};
    `}
  ${({ rowGap }) =>
    rowGap !== undefined &&
    css`
      row-gap: ${getSpace(rowGap)};
    `}
`;

// TEXT COMPONENT - Typography primitive
interface TextProps {
  size?: keyof typeof tokens.fontSizes;
  weight?: keyof typeof tokens.fontWeights;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";
  lineHeight?: string | number;
  truncate?: boolean;
}

export const Text = styled.span<TextProps>`
  ${({ size }) =>
    size &&
    css`
      font-size: ${tokens.fontSizes[size]};
    `}
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${tokens.fontWeights[weight]};
    `}
  ${({ color }) =>
    color &&
    css`
      color: hsl(var(--${color}));
    `}
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
  ${({ transform }) =>
    transform &&
    css`
      text-transform: ${transform};
    `}
  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${lineHeight};
    `}
  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

// HEADING COMPONENT - For titles and headers
interface HeadingProps extends TextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = styled.h2<HeadingProps>`
  margin: 0;
  font-weight: ${tokens.fontWeights.semibold};
  color: hsl(var(--foreground));
  ${({ size }) =>
    size &&
    css`
      font-size: ${tokens.fontSizes[size]};
    `}
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${tokens.fontWeights[weight]};
    `}
  ${({ color }) =>
    color &&
    css`
      color: hsl(var(--${color}));
    `}
`;

// CARD COMPONENT - Container with styling
export const Card = styled(Box)`
  background-color: hsl(var(--card));
  border-radius: ${tokens.radii.lg};
  border: 1px solid hsl(var(--border));
  box-shadow: ${tokens.shadows.sm};
`;

// CONTAINER COMPONENT - Centered content with max-width
export const Container = styled(Box)`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${tokens.space[4]}px;
  padding-right: ${tokens.space[4]}px;
`;
