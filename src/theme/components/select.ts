import { defineSlotRecipe } from '@chakra-ui/react';
import { dark, light } from '@/theme/colors';

export const selectStyles = defineSlotRecipe({
  className: 'select',
  slots: ['root', 'field', 'indicator'],
  base: {},
  variants: {
    variant: { 
      outline: {
        field: {
          border: '1px solid',
          borderColor: 'inherit',
          bg: 'inherit',
          _hover: {
            _light: { borderColor: 'gray.300' },
            _dark: { borderColor: 'whiteAlpha.400' },
          },
          _invalid: {
            _light: {
              borderColor: 'red.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-red-500)',
            },
            _dark: {
              borderColor: 'red.300',
              boxShadow: '0 0 0 1px var(--chakra-colors-red-300)',
            },
          },
          _focusVisible: {
            zIndex: 0,
            _light: {
              borderColor: light.brand,
              boxShadow: `0 0 0 1px var(--chakra-colors-${light.brand.replace('.', '-')})`,
            },
            _dark: {
              borderColor: dark.brand,
              boxShadow: `0 0 0 1px var(--chakra-colors-${dark.brand.replace('.', '-')})`,
            },
          },
        },
      },
    },
  },
});
