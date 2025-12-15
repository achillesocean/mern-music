const space = [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512];

const colors = {
  // Primary/Accent
  primary: "#6C63FF", // Sleek Violet/Blue
  primaryLight: "#8C86FF",

  // Backgrounds
  background: "#F9F9F9", // Very light gray
  card: "#FFFFFF", // White for elements

  // Text
  text: "#222222", // Dark gray for readability
  textMuted: "#666666",

  // Status
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FF9800",
};

const fonstSizes = ["12px", "14px", "16px", "20px", "24px", "32px", "48px"];

const theme = {
  space,
  colors,
  fonstSizes,
};

export type Theme = typeof theme;
export default theme;
