import '@mui/material/styles';
import { PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        white?: PaletteColor;
    }
    interface PaletteOptions {
        white?: PaletteColorOptions;
    }
}
