import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Button, Group, Icon } from '@chakra-ui/react';
import { guild as view } from '@/config/translations/guild';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Banner() {
  const { guild } = useRouter().query as { guild: string };
  const t = view.useTranslations();

  return (
    <Flex
      direction="column"
      px={{ base: 5, lg: 8 }}
      py={{ base: 5, lg: 7 }}
      rounded="2xl"
      bgColor="Brand"
      bgImg={{ base: 'none', sm: 'url(/Banner1.png)' }}
      bgSize="cover"
      gap={1}
    >
      <Heading color="white" fontSize={{ base: '2xl' }} fontWeight="bold">
        {t.banner.title}
      </Heading>
      <Text color="whiteAlpha.800">{t.banner.description}</Text>
      <Group mt={3}>
        <Button
          color="white"
          bg="whiteAlpha.200"
          _hover={{
            bg: 'whiteAlpha.300',
          }}
          _active={{
            bg: 'whiteAlpha.400',
          }}
          asChild
        >
          <Link href={`/guilds/${guild}/settings`}>
            <Icon as={SettingsIcon} />
            {t.bn.settings}
          </Link>
        </Button>
      </Group>
    </Flex>
  );
}
