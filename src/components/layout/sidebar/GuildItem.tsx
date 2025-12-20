import { Avatar, Card, Flex, Skeleton, Text } from '@chakra-ui/react';
import { Guild, iconUrl } from '@/api/discord';
import Link from 'next/link';

export function GuildItem({
  guild,
  active,
  href,
}: {
  guild: Guild;
  active: boolean;
  href: string;
}) {
  return (
    <Card.Root
      bg={active ? 'Brand' : 'MainBackground'}
      color={active ? 'white' : undefined}
      cursor="pointer"
      asChild
      rounded="xl"
    >
      <Link href={href}>
        <Card.Body as={Flex} direction="column" gap={3}>
          <Avatar.Root name={guild.name}>
            {/* @ts-expect-error Chakra v3 types don't expose src/alt on Avatar.Image */}
            <Avatar.Image src={iconUrl(guild)} alt={guild.name} />
            <Avatar.Fallback name={guild.name} />
          </Avatar.Root>
          <Text fontWeight="600">{guild.name}</Text>
        </Card.Body>
      </Link>
    </Card.Root>
  );
}

export function GuildItemsSkeleton() {
  return (
    <>
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
    </>
  );
}
