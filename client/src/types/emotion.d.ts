import "@emotion/react";
import { Theme as CustomTheme } from "../theme/theme";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
