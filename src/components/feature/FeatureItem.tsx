import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, Card } from '@chakra-ui/react';
import { IdFeature } from '@/utils/common';
import { IoOpen, IoOptions } from 'react-icons/io5';
import { useEnableFeatureMutation } from '@/api/hooks';
import { guild as view } from '@/config/translations/guild';
import Router from 'next/router';

export function FeatureItem({
  guild,
  feature,
  enabled,
}: {
  guild: string;
  feature: IdFeature;
  enabled: boolean;
}) {
  const t = view.useTranslations();
  const mutation = useEnableFeatureMutation();

  return (
    <Card.Root variant="elevated" rounded="2xl" p="var(--card-padding)">
      <Card.Body as={Flex} direction="row" gap={3} p={0}>
        <Center
          bg={enabled ? 'Brand' : 'brandAlpha.100'}
          color={enabled ? 'white' : 'brand.500'}
          rounded="xl"
          w="50px"
          h="50px"
          fontSize="3xl"
          _dark={{
            color: enabled ? 'white' : 'brand.200',
          }}
        >
          {feature.icon}
        </Center>
        <Box flex={1}>
          <Text fontSize={{ base: '16px', md: 'lg' }} fontWeight="600">
            {feature.name}
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }} color="TextSecondary">
            {feature.description}
          </Text>
        </Box>
      </Card.Body>
      <Card.Footer as={ButtonGroup} mt={3} p={0}>
        <Button
          size={{ base: 'sm', md: 'md' }}
          disabled={mutation.isPending}
          {...(enabled
            ? {
                colorPalette: 'brand',
                rounded: '2xl',
                leftIcon: <IoOptions />,
                onClick: () => Router.push(`/guilds/${guild}/features/${feature.id}`),
              }
            : {
                leftIcon: <IoOpen />,
                onClick: () => mutation.mutate({ enabled: true, guild, feature: feature.id }),
              })}
        >
          {enabled ? (
            <>
              <IoOptions />
              {t.bn['config feature']}
            </>
          ) : (
            <>
              <IoOpen />
              {t.bn['enable feature']}
            </>
          )}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
