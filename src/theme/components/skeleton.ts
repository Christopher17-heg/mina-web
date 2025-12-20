import { defineRecipe } from '@chakra-ui/react';

export const skeletonStyles = defineRecipe({
  className: 'skeleton',
  base: {
    '--skeleton-start-color': 'colors.navy.600',
    '--skeleton-end-color': 'colors.navy.800',
    _light: {
      '--skeleton-start-color': 'colors.gray.200',
      '--skeleton-end-color': 'colors.gray.300',
    },
  },
});
