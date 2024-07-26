import { createTheme, PaletteColorOptions } from '@mui/material/styles';

export const COLORS = {
    brown_0: '#dad7cd',
    brown_1: '#BC986A',
    green_0: '#a3b18a',
    green_1: '#588157',
    green_2: '#3a5a40',
    green_3: '#344e41',
    blue_0: '#659DBD',   
}

export const COLOR_PALETTE = {
    midnightBlue: "#2C3E50", // Primary Button
    coolGray: "#ECF0F1", // Background
    charcoal: "#34495E", // Text, on white
    emeraldGreen: "#2ECC71", // Secondary Button
    amber: "#F39C12", // Warning
    carmineRed: "#E74C3C", // Error
}

declare module '@mui/material/styles' {
    interface CustomPalette {
      midnightBlue: PaletteColorOptions;
      coolGray: PaletteColorOptions;
      charcoal: PaletteColorOptions;
      emeraldGreen: PaletteColorOptions;
      burntOrange: PaletteColorOptions;
      carmineRed: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}
  
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      midnightBlue: true;
      coolGray: true;
      charcoal: true;
      emeraldGreen: true;
      burntOrange: true;
      carmineRed: true;
    }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
export const theme = createTheme({
  palette: {
    midnightBlue: createColor('#2C3E50'),
    coolGray: createColor('#ECF0F1'),
    charcoal: createColor('#34495E'),
    emeraldGreen: createColor('#228B22'),
    burntOrange: createColor('#FF8C00'),
    carmineRed: createColor('#B22222'),
  },
});