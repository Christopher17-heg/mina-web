import { defineSlotRecipe } from '@chakra-ui/react';
import { dark, light } from '../colors';

const mainFieldStyles = {
  border: '2px solid',
  borderRadius: '16px',
  fontSize: 'sm',
  p: '20px',
  _light: {
    color: 'secondaryGray.900',
    bg: 'transparent',
    _placeholder: {
      color: 'secondaryGray.700',
    },
    _invalid: {
      borderColor: 'red.400',
    },
    borderColor: 'secondaryGray.400',
  },
  _dark: {
    color: 'white',
    bg: 'navy.800',
    _placeholder: {
      color: 'secondaryGray.600',
    },
    _invalid: {
      borderColor: 'red.400',
    },
    borderColor: 'navy.600',
  },
};

export const inputStyles = defineSlotRecipe({
  className: 'input',
  slots: ['root', 'field', 'element', 'addon'],
  base: {
    field: {
      fontWeight: 400,
      _light: {
        borderColor: 'secondaryGray.400',
      },
      _dark: {
        borderColor: 'navy.600',
      },
      borderRadius: '8px',
    },
  },
  variants: {
    variant: {
      flushed: {
        field: {
          _focus: {
            _dark: {
              borderColor: dark.brand,
            },
            _light: {
              borderColor: light.brand,
            },
            boxShadow: 'none',
          },
          fontSize: '2xl',
          fontWeight: '600',
          _light: {
            color: light.textColorPrimary,
            borderBottomColor: 'secondaryGray.400',
          },
          _dark: {
            color: dark.textColorPrimary,
            borderBottomColor: 'navy.600',
          },
        },
      },
      main: {
        field: mainFieldStyles,
      },
      focus: {
        field: {
          ...mainFieldStyles,
          _focus: {
            _light: {
              borderColor: 'brand.300',
            },
            _dark: {
              borderColor: 'brand.400',
            },
          },
        },
      },
      auth: {
        field: {
          bg: 'transparent',
          fontWeight: '500',
          _light: {
            color: 'navy.700',
            borderColor: 'secondaryGray.100',
          },
          _dark: {
            color: 'white',
            borderColor: 'rgba(135, 140, 189, 0.3)',
          },
          border: '1px solid',
          borderRadius: '16px',
          _placeholder: { color: 'secondaryGray.600', fontWeight: '400' },
        },
      },
      authSecondary: {
        field: {
          bg: 'transparent',
          border: '1px solid',
          borderColor: 'secondaryGray.100',
          borderRadius: '16px',
          _placeholder: { color: 'secondaryGray.600' },
        },
      },
      search: {
        field: {
          border: 'none',
          py: '11px',
          borderRadius: 'inherit',
          _placeholder: { color: 'secondaryGray.600' },
        },
      },
    },
  },
});
