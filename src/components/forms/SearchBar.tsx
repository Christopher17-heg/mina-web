import {
  Icon,
  IconButton,
  Input,
  Group,
  GroupProps,
} from '@chakra-ui/react';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { common } from '@/config/translations/common';
import { InputProps } from '@chakra-ui/react';

export function SearchBar(
  props: {
    input?: InputProps;
    onSearch?: () => void;
  } & GroupProps
) {
  const t = common.useTranslations();
  const { input, onSearch, ...rest } = props;

  return (
    <Group {...rest}>
      <IconButton
        aria-label="search"
        bg="inherit"
        borderRadius="inherit"
        variant="ghost"
        onClick={onSearch}
      >
        <Icon color="TextPrimary" width="15px" height="15px">
          <SearchIcon />
        </Icon>
      </IconButton>
      <Input
        fontSize="sm"
        bg="secondaryGray.300"
        color="TextPrimary"
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius="30px"
        placeholder={`${t.search}...`}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch?.();
        }}
        _dark={{
          bg: 'navy.900',
        }}
        {...input}
      />
    </Group>
  );
}
