import { Button, Icon } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export function ThemeSwitch({ secondary }: { secondary?: boolean }) {
  const { theme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      bg="transparent"
      p="0px"
      minW="unset"
      minH="unset"
      h="18px"
      w="max-content"
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
    >
      <Icon
        me="10px"
        h="18px"
        w="18px"
        color={secondary ? 'gray.400' : 'TextPrimary'}
        _dark={{
          color: 'TextPrimary',
        }}
        as={theme === 'light' ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
