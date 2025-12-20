import {
  Avatar,
  Box,
  Flex,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react';
import { UserInfo, avatarUrl } from '@/api/discord';
import { common } from '@/config/translations/common';
import Link from 'next/link';
import { useSelfUser } from '@/api/hooks';
import { useLogoutMutation } from '@/utils/auth/hooks';

export function UserMenu(props: { color: string; shadow: string; bg: string }) {
  const user = useSelfUser();

  return (
    <Menu.Root>
      {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
      <Menu.Trigger cursor="pointer" p="0px" rounded="full" focusRing="outside">
        <Avatar.Root
          colorPalette="brand"
          w="40px"
          h="40px"
          name={user.username}
        >
          {/* @ts-expect-error Chakra v3 types don't expose src/alt on Avatar.Image */}
          <Avatar.Image src={avatarUrl(user)} alt={user.username} />
          <Avatar.Fallback name={user.username} />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Menu.Positioner>
          <List user={user} shadow={props.shadow} menuBg={props.bg} textColor={props.color} />
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function List(props: { textColor: string; shadow: string; menuBg: string; user: UserInfo }) {
  const t = common.useTranslations();
  const { menuBg, shadow, textColor, user } = props;
  const logout = useLogoutMutation();

  return (
    // @ts-expect-error Chakra v3 types don't include children on compound components
    <Menu.Content boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
      <Flex w="100%" mb="0px">
        <Text
          ps="20px"
          pt="16px"
          pb="10px"
          w="100%"
          borderBottom="1px solid"
          borderColor={{ _light: '#E6ECFA', _dark: 'rgba(135, 140, 189, 0.3)' }}
          fontSize="sm"
          fontWeight="700"
          color={textColor}
        >
          <span aria-label="Hi" role="img">
            👋
          </span>
          &nbsp; Hey, {user.username}
        </Text>
      </Flex>
      <Flex flexDirection="column" p="10px">
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Menu.Item value="profile" asChild>
          <Link
            href={`/user/profile`}
            style={{ borderRadius: '8px', padding: '0 14px' }}
          >
            <Text fontSize="sm">{t.profile}</Text>
          </Link>
        </Menu.Item>
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Menu.Item
          value="logout"
          color="red.400"
          borderRadius="8px"
          onClick={() => logout.mutate()}
          px="14px"
        >
          <Text fontSize="sm">{t.logout}</Text>
        </Menu.Item>
      </Flex>
    </Menu.Content>
  );
}
