/**
 * Type augmentations for Chakra UI v3
 *
 * Fixes type issues with Ark UI compound components that don't properly
 * expose children and standard HTML props in their type definitions.
 */

import type { ReactNode } from 'react';

// Augment Ark UI types to include children and standard props
declare module '@ark-ui/react' {
  // Avatar components
  interface AvatarImageBaseProps {
    src?: string;
    alt?: string;
    children?: ReactNode;
  }

  interface AvatarFallbackBaseProps {
    children?: ReactNode;
  }

  // Menu components
  interface MenuTriggerBaseProps {
    children?: ReactNode;
  }

  interface MenuPositionerBaseProps {
    children?: ReactNode;
  }

  interface MenuContentBaseProps {
    children?: ReactNode;
  }

  interface MenuItemBaseProps {
    children?: ReactNode;
  }

  // Popover components
  interface PopoverTriggerBaseProps {
    children?: ReactNode;
  }

  interface PopoverPositionerBaseProps {
    children?: ReactNode;
  }

  interface PopoverContentBaseProps {
    children?: ReactNode;
  }

  // Drawer components
  interface DrawerPositionerBaseProps {
    children?: ReactNode;
  }

  interface DrawerContentBaseProps {
    children?: ReactNode;
  }

  interface DrawerCloseTriggerBaseProps {
    children?: ReactNode;
  }

  // Switch components
  interface SwitchControlBaseProps {
    children?: ReactNode;
  }

  // Breadcrumb components
  interface BreadcrumbListBaseProps {
    separator?: ReactNode;
  }
}
