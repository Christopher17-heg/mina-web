# Migration Plan: Dependency Update Refactoring

## Overview
This document outlines the necessary code changes to make the codebase compatible with the updated dependencies while maintaining all existing functionality.

## Updated Dependencies (Key Changes)
- **React**: 19.x (major update)
- **Next.js**: 16.x (major update)
- **Chakra UI**: 3.x (major breaking changes)
- **TanStack Query (React Query)**: 5.x (API changes)
- **Framer Motion**: 12.x (minor API changes)
- **Zod**: 4.x (minor changes)
- **cookies-next**: 6.x (type export changes)
- **TypeScript**: 5.9.x (stricter checks)

---

## Category 1: Chakra UI v3 Migration

### 1.1 Removed/Renamed Exports
The following imports no longer exist in Chakra UI v3 and must be updated:

| Old Import | New Solution |
|------------|--------------|
| `useColorMode` | Use `useColorMode` from `next-themes` or Chakra's new `useTheme` |
| `useColorModeValue` | Replace with semantic tokens or conditional styling using `_light`/`_dark` |
| `ColorModeScript` | No longer needed - use `next-themes` ThemeProvider |
| `extendTheme` | Use `createSystem` and `defineConfig` from `@chakra-ui/react` |
| `FormControl`, `FormLabel`, `FormErrorMessage` | Use `Field` component with `Field.Root`, `Field.Label`, `Field.ErrorText` |
| `InputLeftAddon` | Use `InputAddon` |
| `InputLeftElement`, `InputRightElement` | Use `InputElement` with positioning |
| `DrawerOverlay`, `DrawerCloseButton` | Drawer structure changed - use `Drawer.Backdrop`, `Drawer.CloseTrigger` |
| `MenuButton`, `MenuList`, `MenuItem` | Use `Menu.Trigger`, `Menu.Content`, `Menu.Item` |
| `SwitchProps` | Use `Switch.RootProps` |
| `SlideFade` | Use Framer Motion or CSS transitions |
| `createMultiStyleConfigHelpers` | Use recipe system with `defineSlotRecipe` |
| `defineStyleConfig` | Use `defineRecipe` |
| `cssVar` | Use CSS custom properties directly |
| `getToken` | Use `token()` function |

### 1.2 Component API Changes (Compound Components)
Chakra UI v3 uses compound components pattern:

**Card:**
```tsx
// Old
<Card><CardBody>...</CardBody></Card>

// New
<Card.Root><Card.Body>...</Card.Body></Card.Root>
```

**Menu:**
```tsx
// Old
<Menu><MenuButton /><MenuList><MenuItem /></MenuList></Menu>

// New
<Menu.Root><Menu.Trigger /><Menu.Content><Menu.Item /></Menu.Content></Menu.Root>
```

**Avatar:**
```tsx
// Old
<Avatar src="..." name="..." />

// New
<Avatar.Root><Avatar.Image src="..." /><Avatar.Fallback>...</Avatar.Fallback></Avatar.Root>
```

**Popover:**
```tsx
// Old
<Popover><PopoverTrigger>...</PopoverTrigger><PopoverContent>...</PopoverContent></Popover>

// New
<Popover.Root><Popover.Trigger>...</Popover.Trigger><Popover.Content>...</Popover.Content></Popover.Root>
```

**Switch:**
```tsx
// Old
<Switch isChecked={...} />

// New
<Switch.Root checked={...}><Switch.HiddenInput /><Switch.Control><Switch.Thumb /></Switch.Control></Switch.Root>
```

**Drawer:**
```tsx
// Old
<Drawer><DrawerOverlay /><DrawerContent><DrawerCloseButton />...</DrawerContent></Drawer>

// New
<Drawer.Root><Drawer.Backdrop /><Drawer.Content><Drawer.CloseTrigger />...</Drawer.Content></Drawer.Root>
```

**Breadcrumb:**
```tsx
// Old
<Breadcrumb><BreadcrumbItem>...</BreadcrumbItem></Breadcrumb>

// New
<Breadcrumb.Root><Breadcrumb.List><Breadcrumb.Item>...</Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root>
```

**Tag:**
```tsx
// Old
<Tag>...</Tag>

// New
<Tag.Root><Tag.Label>...</Tag.Label></Tag.Root>
```

**InputGroup:**
```tsx
// Old
<InputGroup><InputLeftElement>...</InputLeftElement><Input /></InputGroup>

// New
<Group><InputAddon>...</InputAddon><Input /></Group>
// Or use InputElement with positioning
```

### 1.3 Prop Renames
| Old Prop | New Prop |
|----------|----------|
| `isChecked` | `checked` |
| `isDisabled` | `disabled` |
| `isLoading` | `loading` |
| `isInvalid` | `invalid` |
| `isRequired` | `required` |
| `isOpen` | `open` |
| `onClose` | `onOpenChange` |
| `leftIcon` | `children` (icon as child) or custom slot |
| `icon` (IconButton) | `children` |

### 1.4 Button Variants
Custom variants like `action`, `danger`, `secondary` need to be defined in the theme recipe system.

### 1.5 Responsive Syntax
Custom breakpoints like `'3sm'` must be registered in the theme system.

### 1.6 Theme Configuration
```tsx
// Old
import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({...});

// New
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
const config = defineConfig({...});
export const system = createSystem(defaultConfig, config);
```

### 1.7 ChakraProvider
```tsx
// Old
<ChakraProvider theme={theme}>

// New
<ChakraProvider value={system}>
```

---

## Category 2: TanStack Query v5 Migration

### 2.1 useQuery API Changes
```typescript
// Old
useQuery(['key'], queryFn, { enabled: true });

// New
useQuery({ queryKey: ['key'], queryFn, enabled: true });
```

### 2.2 useMutation API Changes
```typescript
// Old
useMutation(mutationFn, { onSuccess: ... });

// New
useMutation({ mutationFn, onSuccess: ... });
```

### 2.3 invalidateQueries
```typescript
// Old
client.invalidateQueries(['key']);

// New
client.invalidateQueries({ queryKey: ['key'] });
```

### 2.4 Property Renames
| Old Property | New Property |
|--------------|--------------|
| `isLoading` | `isPending` |

---

## Category 3: Framer Motion Updates

### 3.1 AnimatePresence
```tsx
// Old
<AnimatePresence exitBeforeEnter>

// New
<AnimatePresence mode="wait">
```

---

## Category 4: TypeScript/BigInt Issues

### 4.1 Permission Flags
The bit shift operations beyond 32 bits need to use `BigInt`:
```typescript
// Old (causes overflow)
REQUEST_TO_SPEAK = 1 << 32,

// New
REQUEST_TO_SPEAK = 1n << 32n,
```

---

## Category 5: cookies-next v6 Changes

### 5.1 Type Import Path
```typescript
// Old
import type { OptionsType } from 'cookies-next/lib/types';

// New
import type { OptionsType } from 'cookies-next';
```

---

## Category 6: chakra-react-select Compatibility

### 6.1 Props Changes
- `focusBorderColor` may need to be handled differently
- Style functions need to return proper `SystemStyleObject` types

---

## Files to Modify

### High Priority (Core/Config)
1. `src/theme/config.tsx` - Theme system rewrite
2. `src/pages/_app.tsx` - Provider updates
3. `src/pages/_document.tsx` - Remove ColorModeScript
4. `src/api/hooks.ts` - React Query v5 syntax
5. `src/api/discord.ts` - BigInt for permissions
6. `src/utils/auth/hooks.ts` - React Query v5 syntax
7. `src/utils/auth/server.ts` - cookies-next types

### Theme Components (Recipes)
8. `src/theme/components/avatar.ts`
9. `src/theme/components/button.ts`
10. `src/theme/components/input.ts`
11. `src/theme/components/select.ts`
12. `src/theme/components/skeleton.ts`
13. `src/theme/components/textarea.ts`
14. `src/theme/components/card.ts`
15. `src/theme/components/menu.ts`
16. `src/theme/components/modal.ts`
17. `src/theme/components/popover.ts`
18. `src/theme/components/switch.ts`
19. `src/theme/components/tabs.ts`
20. `src/theme/components/slider.ts`

### Components (UI Updates)
21. `src/components/ThemeSwitch.tsx`
22. `src/components/GuildBanner.tsx`
23. `src/components/chart/StyledChart.tsx`
24. `src/components/feature/FeatureItem.tsx`
25. `src/components/feature/UpdateFeaturePanel.tsx`
26. `src/components/forms/ChannelSelect.tsx`
27. `src/components/forms/ColorPicker.tsx`
28. `src/components/forms/DatePicker.tsx`
29. `src/components/forms/FilePicker.tsx`
30. `src/components/forms/InputForm.tsx`
31. `src/components/forms/RoleSelect.tsx`
32. `src/components/forms/SearchBar.tsx`
33. `src/components/forms/SelectField.tsx`
34. `src/components/forms/SwitchField.tsx`
35. `src/components/forms/TextAreaForm.tsx`
36. `src/components/layout/Separator.tsx`
37. `src/components/layout/app.tsx`
38. `src/components/layout/navbar/default.tsx`
39. `src/components/layout/navbar/index.tsx`
40. `src/components/layout/sidebar/GuildItem.tsx`
41. `src/components/layout/sidebar/index.tsx`
42. `src/components/layout/sidebar/SidebarContent.tsx`
43. `src/components/layout/guild/guild-navbar.tsx`
44. `src/components/layout/guild/guild-sidebar.tsx`
45. `src/components/menu/UserMenu.tsx`
46. `src/components/panel/ErrorPanel.tsx`

### Pages
47. `src/pages/auth/signin.tsx`
48. `src/pages/user/home.tsx`
49. `src/pages/user/profile.tsx`
50. `src/pages/guilds/[guild]/index.tsx`
51. `src/pages/guilds/[guild]/features/[feature].tsx`

### Config
52. `src/config/common.tsx`
53. `src/config/example/HomeView.tsx`

---

## Execution Order

1. **Phase 1: Foundation**
   - Fix TypeScript BigInt issues (discord.ts)
   - Fix cookies-next types (server.ts)
   - Update tsconfig.json if needed

2. **Phase 2: Theme System**
   - Rewrite theme configuration using new Chakra v3 system
   - Convert all component styles to recipes

3. **Phase 3: React Query**
   - Update all useQuery/useMutation calls to v5 syntax
   - Fix invalidateQueries calls

4. **Phase 4: Core Providers**
   - Update _app.tsx with new ChakraProvider
   - Update _document.tsx

5. **Phase 5: Components**
   - Update all components to use compound component pattern
   - Fix prop names and removed features

6. **Phase 6: Testing & Verification**
   - Run build
   - Fix any remaining type errors
   - Verify all functionality works

---

## Notes
- NO functionality changes - only API compatibility updates
- NO dependency changes - versions are already updated
- All existing features must continue working
- Use internet resources when stuck on specific Chakra v3 patterns
