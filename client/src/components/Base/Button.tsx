import styled from "@emotion/styled";
import {
  space,
  color,
  layout,
  flexbox,
  typography,
  border,
  type SpaceProps,
  type ColorProps,
  type LayoutProps,
  type FlexboxProps,
  type TypographyProps,
  type BorderProps,
} from "styled-system";

type ButtonProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  TypographyProps &
  BorderProps;

interface StyledButtonProps {
  variant?: "primary" | "secondary" | "danger";
}

const getVariantStyles = (theme: any, variant = "primary") => {
  switch (variant) {
    case "primary":
      return `
                background-color: ${theme.colors.primary};
                color: ${theme.colors.card};
                &:hover { background-color: ${theme.colors.primaryLight}; }
            `;
    case "danger":
      return `
                background-color: ${theme.colors.error};
                color: ${theme.colors.card};
                &:hover { background-color: #d32f2f; }
            `;
    default: // secondary (e.g., outlined)
      return `
                background-color: transparent;
                color: ${theme.colors.text};
                border: 1px solid ${theme.colors.textMuted};
                &:hover { background-color: #EEEEEE; }
            `;
  }
};

export const Button = styled.button<
  StyledButtonProps & ButtonProps & React.ComponentPropsWithoutRef<"button">
>`
  /* Reset HTML defaults and apply base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes[2]}; /* 16px */
  padding: ${(props) => props.theme.space[3]}px
    ${(props) => props.theme.space[4]}px; /* 16px horizontal, 8px vertical */

  /* Apply styles based on variant prop */
  ${(props) => getVariantStyles(props.theme, props.variant)}

  /* Apply inherited styled-system properties */
    ${space}
    ${color}
    ${layout}
    ${flexbox}
    ${typography}
    ${border}
`;
