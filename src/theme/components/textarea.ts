import { defineRecipe } from '@chakra-ui/react';
import { light, dark } from '../colors';

export const textareaStyles = defineRecipe({
  className: 'textarea',
  base: {
    fontWeight: 400,
    borderRadius: '8px',
    fontSize: 'md',
    rounded: 'lg',
    border: 0,
    _focus: { boxShadow: 'none' },
    _light: {
      bg: light.globalBg,
    },
    _dark: {
      bg: dark.globalBg,
    },
  },
  variants: {
    variant: {
      main: {
        border: '2px solid',
        borderRadius: '16px',
        fontSize: 'sm',
        p: '20px',
        _light: {
          bg: 'transparent',
          color: 'secondaryGray.900',
          borderColor: 'secondaryGray.400',
          _placeholder: {
            color: 'secondaryGray.700',
          },
        },
        _dark: {
          bg: 'navy.800',
          color: 'white',
          borderColor: 'navy.600',
          _placeholder: {
            color: 'secondaryGray.600',
          },
        },
      },
      glass: {
        borderColor: 'var(--border-color)',
        border: '1px solid',
        _light: {
          bg: 'secondaryGray.300',
          borderColor: 'blackAlpha.200',
          _invalid: {
            borderColor: 'red.300',
          },
          _placeholder: {
            color: 'secondaryGray.700',
          },
        },
        _dark: {
          bg: 'blackAlpha.300',
          borderColor: 'whiteAlpha.200',
          _invalid: {
            borderColor: 'red.400',
          },
          _placeholder: {
            color: 'secondaryGray.600',
          },
        },
      },
    },
  },
});
