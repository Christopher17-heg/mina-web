import {
  Heading,
  Button,
  Card,
  Avatar,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { useGuilds } from '@/api/hooks';
import HomeView from '@/config/example/HomeView';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layout/app';
import { iconUrl } from '@/api/discord';
import Link from 'next/link';

const HomePage: NextPageWithLayout = () => {
  //used for example only, you should remove it
  return <HomeView />;

  return <GuildSelect />;
};

export function GuildSelect() {
  const guilds = useGuilds();

  if (guilds.status === 'success')
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        {guilds.data
          ?.filter((guild) => config.guild.filter(guild))
          .map((guild) => (
            <Card.Root key={guild.id} variant="elevated" asChild>
              <Link href={`/guilds/${guild.id}`}>
                <Card.Header as={Flex} flexDirection="row" gap={3}>
                  <Avatar.Root size="md">
                    {/* @ts-expect-error Chakra v3 types don't expose src on Avatar.Image */}
                    <Avatar.Image src={iconUrl(guild)} />
                    {/* @ts-expect-error Chakra v3 types don't include children on Avatar.Fallback */}
                    <Avatar.Fallback>{guild.name.slice(0, 2)}</Avatar.Fallback>
                  </Avatar.Root>
                  <Text>{guild.name}</Text>
                </Card.Header>
              </Link>
            </Card.Root>
          ))}
      </SimpleGrid>
    );

  if (guilds.status === 'error')
    return (
      <Button w="fit-content" colorPalette="red" onClick={() => guilds.refetch()}>
        Try Again
      </Button>
    );

  if (guilds.status === 'pending')
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        <Skeleton minH="88px" rounded="2xl" />
        <Skeleton minH="88px" rounded="2xl" />
        <Skeleton minH="88px" rounded="2xl" />
        <Skeleton minH="88px" rounded="2xl" />
        <Skeleton minH="88px" rounded="2xl" />
      </SimpleGrid>
    );

  return <></>;
}

HomePage.getLayout = (c) => <AppLayout>{c}</AppLayout>;
export default HomePage;
