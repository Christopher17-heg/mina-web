import {
  Center,
  Circle,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  Button,
  Card,
  Icon,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { StyledChart } from '@/components/chart/StyledChart';
import { dashboard } from '@/config/translations/dashboard';
import Link from 'next/link';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoOpen, IoPricetag } from 'react-icons/io5';
import { FaRobot } from 'react-icons/fa';
import { MdVoiceChat } from 'react-icons/md';
import { GuildSelect } from '@/pages/user/home';

export default function HomeView() { 
  const t = dashboard.useTranslations();

  return (
    <Flex direction="column" gap={5}>
      <Flex direction="row" alignItems="center" rounded="2xl" bg="Brand" gap={4} p={5}>
        <Circle
          color="white"
          bgGradient="linear(to right bottom, transparent, blackAlpha.600)"
          p={4}
          shadow="2xl"
          display={{ base: 'none', md: 'block' }}
        >
          <Icon w="60px" h="60px">
            <FaRobot />
          </Icon>
        </Circle>

        <Flex direction="column" align="start" gap={1}>
          <Heading color="white" fontSize="2xl" fontWeight="bold">
            {t.invite.title}
          </Heading>
          <Text color="whiteAlpha.800">{t.invite.description}</Text>
          <Button
            mt={3}
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
            <Link href={config.inviteUrl}>
              <Icon>
                <IoOpen />
              </Icon>
              {t.invite.bn}
            </Link>
          </Button>
        </Flex>
      </Flex>

      <Flex direction="column" gap={1} mt={3}>
        <Heading size="md">{t.servers.title}</Heading>
        <Text color="TextSecondary">{t.servers.description}</Text>
      </Flex>
      <GuildSelect />

      <Flex direction="column" gap={1}>
        <Heading size="md">{t.command.title}</Heading>
        <Text color="TextSecondary">{t.command.description}</Text>
        <HStack mt={3}>
          <Button colorPalette="brand">
            <Icon>
              <IoPricetag />
            </Icon>
            {t.pricing}
          </Button>
          <Button px={6} rounded="xl" variant="outline">
            {t.learn_more}
          </Button>
        </HStack>
      </Flex>
      <TestChart />
      <Grid templateColumns={{ base: '1fr', lg: '0.5fr 1fr' }} gap={3}>
        <Card.Root rounded="3xl" variant="elevated">
          <Card.Body as={Center} p={4} flexDirection="column" gap={3}>
            <Circle p={4} bg="brandAlpha.100" color="brand.500" _dark={{ color: 'brand.200' }}>
              <Icon w="80px" h="80px">
                <BsMusicNoteBeamed />
              </Icon>
            </Circle>
            <Text fontWeight="medium">{t.vc.create}</Text>
          </Card.Body>
        </Card.Root>
        <Flex direction="column" gap={3}>
          <Text fontSize="lg" fontWeight="600">
            {t.vc['created channels']}
          </Text>
          <VoiceChannelItem />
          <VoiceChannelItem />
        </Flex>
      </Grid>
    </Flex>
  );
}

function TestChart() {
  return (
    <StyledChart
      options={{
        colors: ['#4318FF', '#39B8FF'],
        chart: {
          animations: {
            enabled: false,
          },
        },
        xaxis: {
          categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
        },
        legend: {
          position: 'right',
        },
        responsive: [
          {
            breakpoint: 650,
            options: {
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      }}
      series={[
        {
          name: 'Paid',
          data: [50, 64, 48, 66, 49, 68],
        },
        {
          name: 'Free Usage',
          data: [30, 50, 13, 46, 26, 16],
        },
      ]}
      height="300"
      type="line"
    />
  );
}

function VoiceChannelItem() {
  return (
    <Card.Root rounded="2xl" variant="elevated">
      <Card.Header as={HStack}>
        <Icon color="Brand" fontSize={{ base: '2xl', md: '3xl' }}>
          <MdVoiceChat />
        </Icon>
        <Text>My Channel</Text>
      </Card.Header>
      <Card.Body mt={3}>
        <Text color="TextSecondary">89 Members</Text>
      </Card.Body>
    </Card.Root>
  );
}
