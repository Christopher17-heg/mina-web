import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useActiveSidebarItem, SidebarItemInfo } from '@/utils/router';
import { useGuilds, useSelfUserQuery } from '@/api/hooks';
import { SearchBar } from '@/components/forms/SearchBar';
import { useMemo, useState } from 'react';
import { config } from '@/config/common';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { avatarUrl } from '@/api/discord';
import { GuildItem, GuildItemsSkeleton } from './GuildItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SidebarItem } from './SidebarItem';
import items from '@/config/sidebar-items';

export function SidebarContent() {
  const [filter, setFilter] = useState('');
  const guilds = useGuilds();
  const { guild: selectedGroup } = useRouter().query as {
    guild: string;
  };

  const filteredGuilds = useMemo(
    () =>
      guilds.data?.filter((guild) => {
        const contains = guild.name.toLowerCase().includes(filter.toLowerCase());

        return config.guild.filter(guild) && contains;
      }),
    [guilds.data, filter]
  );

  return (
    <>
      <VStack align="center" py="2rem" m={3} bg="Brand" rounded="xl">
        <Heading size="lg" fontWeight={600} color="white">
          {config.name}
        </Heading>
      </VStack>

      <Stack direction="column" mb="auto">
        <Items />
        <Box px="10px">
          <SearchBar
            w="full"
            input={{
              value: filter,
              onChange: (e) => setFilter(e.target.value),
            }}
          />
        </Box>
        <Flex direction="column" px="10px" gap={3}>
          {filteredGuilds == null ? (
            <GuildItemsSkeleton />
          ) : (
            filteredGuilds?.map((guild) => (
              <GuildItem
                key={guild.id}
                guild={guild}
                active={selectedGroup === guild.id}
                href={`/guilds/${guild.id}`}
              />
            ))
          )}
        </Flex>
      </Stack>
    </>
  );
}

export function BottomCard() {
  const user = useSelfUserQuery().data;
  if (user == null) return <></>;

  return (
    <Card.Root pos="sticky" left={0} bottom={0} w="full" py={2}>
      <Card.Body as={HStack}>
        <Avatar.Root size="sm" name={user.username}>
          {/* @ts-expect-error Chakra v3 types don't expose src/alt on Avatar.Image */}
          <Avatar.Image src={avatarUrl(user)} alt={user.username} />
          <Avatar.Fallback name={user.username} />
        </Avatar.Root>
        <Text fontWeight="600">{user.username}</Text>
        <Spacer />
        <IconButton asChild aria-label="settings">
          <Link href="/user/profile">
            <SettingsIcon />
          </Link>
        </IconButton>
      </Card.Body>
    </Card.Root>
  );
}

function Items() {
  const active = useActiveSidebarItem();

  return (
    <Flex direction="column" px="10px" gap={0}>
      {items
        .filter((item) => !item.hidden)
        .map((route: SidebarItemInfo, index: number) => (
          <SidebarItem
            key={index}
            href={route.path}
            name={route.name}
            icon={route.icon}
            active={active === route}
          />
        ))}
    </Flex>
  );
}
