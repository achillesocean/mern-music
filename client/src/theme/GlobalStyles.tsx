import React from "react";
import { Global, css, useTheme } from "@emotion/react";
import type { Theme } from "@emotion/react";

const globalStyles = (theme: Theme) => css`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    line-height: 1.5;
    /* Use a themed color for text */
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
`;

const GlobalStyles: React.FC = () => {
  const theme = useTheme();

  // The Global component applies the CSS rules to the entire document.
  return <Global styles={globalStyles(theme)} />;
};

export default GlobalStyles;
