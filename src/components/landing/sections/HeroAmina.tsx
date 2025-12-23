'use client';

import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  VStack,
  Text,
  Image,
  Icon,
} from '@chakra-ui/react';
import { LuShield, LuZap, LuMoon } from 'react-icons/lu';
import { ImagePaths } from '@/utils/cdn';
import { getInviteUrl, getDocsUrl } from '@/config/permalinks';
import { animations } from '../keyframes';
import { PrimaryBtn, SecondaryBtn } from '../buttons';

interface HeroAminaProps {
  formattedGuildCount: string;
  uptime: number;
}

/**
 * HeroAmina Section
 * =================
 * Landing page hero with character, stats, and CTA buttons
 */
export const HeroAmina = ({ formattedGuildCount, uptime }: HeroAminaProps) => {
  const addBotUrl = getInviteUrl();
  const docsUrl = getDocsUrl();

  return (
    <Box
      as="section"
      id="hero"
      position="relative"
      overflow="hidden"
      bgGradient="linear(to-b, night.black, night.shadow, night.black)"
      py={{ base: '20', md: '32' }}
    >
      {/* Background Effects */}
      <Box position="absolute" inset="0" overflow="hidden" opacity="0.3">
        <Box
          position="absolute"
          top="20"
          left="10"
          w="96"
          h="96"
          bg="amina.crimson/20"
          rounded="full"
          filter="blur(48px)"
          className="animate-pulse"
        />
        <Box
          position="absolute"
          bottom="20"
          right="10"
          w="96"
          h="96"
          bg="cyber.blue/20"
          rounded="full"
          filter="blur(48px)"
          className="animate-pulse"
          css={{ animationDelay: '1s' }}
        />
      </Box>

      <Container
        position="relative"
        maxW="8xl"
        px={{ base: '4', sm: '6', lg: '8' }}
      >
        <Grid
          templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          gap="12"
          alignItems="center"
        >
          {/* Content */}
          <VStack
            align="start"
            gap="8"
            css={{ animation: animations.fadeInUp }}
          >
            <VStack align="start" gap="4">
              <Text
                as="h1"
                fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }}
                fontFamily="heading"
                fontWeight="bold"
                lineHeight="tight"
              >
                <Text as="span" display="block" color="gray.100">
                  Protect Your
                </Text>
                <Text as="span" color="gray.100">
                  Discord Server
                  <Text
                    as="sup"
                    color="cyber.blue/70"
                    fontSize="lg"
                    fontFamily="mono"
                  >
                    *
                  </Text>{' '}
                  with{' '}
                </Text>
                <Text
                  as="span"
                  bgGradient="linear(to-r, amina.500, rose.500, amina.500)"
                  bgClip="text"
                  bgSize="200% auto"
                  css={{ animation: animations.gradientText }}
                >
                  Amina
                </Text>
              </Text>

              <Text
                fontSize="xs"
                color="gray.500"
                fontStyle="italic"
                fontFamily="mono"
              >
                <Text as="span" color="cyber.blue/70">
                  *
                </Text>{' '}
                Amina prefers to call them "realms" (✿◠‿◠)
              </Text>

              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                color="gray.300"
                maxW="2xl"
                lineHeight="relaxed"
              >
                Your friendly guardian bringing tactical moderation, creative
                engagement and unwavering protection to your community.{' '}
                <Text as="span" fontSize="2xl">
                  (•̀ᴗ•́)و
                </Text>
              </Text>
            </VStack>

            {/* CTA Buttons */}
            <Flex direction={{ base: 'column', sm: 'row' }} gap="4">
              <PrimaryBtn url={addBotUrl} text="Add to Discord" icon="discord" />
              <SecondaryBtn url={docsUrl} text="Documentation" icon="file-text" />
            </Flex>

            {/* Stats */}
            <Flex
              flexWrap="wrap"
              alignItems="center"
              gap="6"
              pt="4"
              fontSize="sm"
              color="gray.400"
            >
              <HStack gap="2">
                <Icon as={LuShield} color="discord.green" boxSize="5" />
                <Text>
                  <Text as="strong" color="gray.200">
                    {formattedGuildCount}
                  </Text>{' '}
                  Protected Realms
                </Text>
              </HStack>
              <HStack gap="2">
                <Icon as={LuZap} color="imperial.500" boxSize="5" />
                <Text>
                  <Text as="strong" color="gray.200">
                    {uptime.toFixed(1)}%
                  </Text>{' '}
                  Uptime
                </Text>
              </HStack>
              <HStack gap="2">
                <Icon as={LuMoon} color="cyber.400" boxSize="5" />
                <Text>
                  <Text as="strong" color="gray.200">
                    24/7
                  </Text>{' '}
                  Guardian Active
                </Text>
              </HStack>
            </Flex>
          </VStack>

          {/* Character Image */}
          <Box display={{ base: 'none', lg: 'block' }} position="relative">
            <Box position="relative">
              {/* Glow effect */}
              <Box
                position="absolute"
                inset="0"
                rounded="full"
                bgGradient="linear(to-r, cyber.blue/20, amina.crimson/20)"
                filter="blur(32px)"
                css={{ animation: 'spin 20s linear infinite' }}
              />

              {/* Character */}
              <Image
                src={ImagePaths.hero.hero}
                alt="Amina - Your Discord Guardian"
                w="full"
                h="auto"
                position="relative"
                zIndex="1"
                filter="drop-shadow(0 25px 25px rgba(0,0,0,0.5))"
                css={{ animation: animations.float }}
              />

              {/* Floating UI element */}
              <Box
                position="absolute"
                top="20"
                left="-10"
                bg="night.steel/80"
                backdropFilter="blur(12px)"
                borderWidth="1px"
                borderColor="cyber.blue/50"
                rounded="lg"
                px="4"
                py="2"
              >
                <Text color="cyber.blue" fontSize="sm" fontFamily="mono">
                  :/ heyyo, i'm amina
                </Text>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};
