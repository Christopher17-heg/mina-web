import { defineRecipe } from '@chakra-ui/react';

export const buttonStyles = defineRecipe({
  className: 'button',
  base: {
    borderRadius: '16px',
    transition: '.25s all ease',
    boxSizing: 'border-box',
    _focus: {
      boxShadow: 'none',
    },
    _active: { 
      boxShadow: 'none',
    },
  },
  variants: {
    variant: {
      danger: {
        color: 'white',
        bg: 'red.500',
        _hover: { bg: 'red.400' },
        _active: { bg: 'red.300' },
      },
      action: {
        fontWeight: '600',
        borderRadius: '50px',
        color: 'white',
        rounded: 'xl',
        _light: {
          bg: 'linear-gradient(to right bottom, var(--chakra-colors-brand-500), var(--chakra-colors-brand-400))',
          boxShadow: '1px 2px 5px var(--chakra-colors-brand-400)',
        },
        _dark: {
          bg: 'linear-gradient(to right bottom, var(--chakra-colors-brand-400), var(--chakra-colors-brand-500))',
          boxShadow: '1px 2px 15px var(--chakra-colors-brand-400)',
        },
      },
      secondary: {
        _light: {
          bg: 'white',
          shadow: 'normal',
        },
        _dark: {
          bg: 'whiteAlpha.200',
          _hover: {
            bg: 'whiteAlpha.300',
          },
          _active: {
            bg: 'whiteAlpha.300',
          },
        },
      },
    },
  },
});
