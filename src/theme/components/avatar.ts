import { defineSlotRecipe } from '@chakra-ui/react';

export const avatarStyles = defineSlotRecipe({
  className: 'avatar',
  slots: ['root', 'image', 'fallback'],
  base: {
    root: {
      bg: 'brand.300',
      color: 'white',
    },
  },
  variants: {
    variant: {
      border: {
        root: {
          border: 'auto',
          borderWidth: 10,
          borderColor: '#ffffff',
          _dark: {
            borderColor: 'navy.800',
          },
        },
      },
      normal: {
        root: {
          border: 0,
        },
      },
    },
  },
});
