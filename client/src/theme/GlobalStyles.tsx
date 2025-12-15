import React from "react";
import { Global, css, useTheme } from "@emotion/react";

const globalStyles = css`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Crucial: ensures padding/borders don't affect total element width/height */
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    line-height: 1.5;
    /* Use a themed color for text */
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.background};
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
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const GlobalStyles: React.FC = () => {
  // We use useTheme() just to ensure the theme context is loaded,
  // although in this case, the `css` function is capable of accessing the theme directly.
  const theme = useTheme();

  // The Global component applies the CSS rules to the entire document.
  return <Global styles={globalStyles(theme)} />;
};

export default GlobalStyles;
