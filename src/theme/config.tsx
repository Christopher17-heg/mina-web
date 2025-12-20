import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { breakpoints } from './breakpoints';
import { colors, dark, light } from './colors';

const customConfig = defineConfig({
  theme: {
    breakpoints,
    tokens: {
      colors,
      fonts: {
        heading: {
          value: `Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif`,
        },
        body: {
          value: `Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif`,
        },
      },
    },
    semanticTokens: {
      shadows: {
        normal: {
          value: {
            _light: light.shadow,
            _dark: dark.shadow,
          },
        },
      },
      colors: {
        TextPrimary: {
          value: {
            _light: `{colors.${light.textColorPrimary}}`,
            _dark: `{colors.${dark.textColorPrimary}}`,
          },
        },
        TextSecondary: {
          value: {
            _light: `{colors.${light.textColorSecondary}}`,
            _dark: `{colors.${dark.textColorSecondary}}`,
          },
        },
        MainBackground: {
          value: {
            _light: `{colors.${light.globalBg}}`,
            _dark: `{colors.${dark.globalBg}}`,
          },
        },
        InputBackground: {
          value: {
            _light: '{colors.secondaryGray.300}',
            _dark: '{colors.blackAlpha.300}',
          },
        },
        InputBorder: {
          value: {
            _light: '{colors.blackAlpha.200}',
            _dark: '{colors.whiteAlpha.200}',
          },
        },
        Brand: {
          value: {
            _light: `{colors.${light.brand}}`,
            _dark: `{colors.${dark.brand}}`,
          },
        },
        CardBackground: {
          value: {
            _light: `{colors.${light.cardBg}}`,
            _dark: `{colors.${dark.cardBg}}`,
          },
        },
      },
    },
  },
  globalCss: {
    '::-webkit-scrollbar': {
      w: '5px',
      h: '5px',
      bg: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      bg: { _light: 'rgba(0, 0, 0, 0.2)', _dark: 'rgba(255, 255, 255, 0.2)' },
    },
    '::-webkit-calendar-picker-indicator': {
      filter: { _light: 'none', _dark: 'invert(1)' },
    },
    body: {
      color: 'TextPrimary',
      bg: 'MainBackground',
    },
    input: {
      color: 'gray.700',
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

// Export theme for backwards compatibility in some edge cases
export const theme = system;
