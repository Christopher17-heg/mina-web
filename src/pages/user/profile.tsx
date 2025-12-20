import { Flex, Grid, Spacer, Text, VStack } from '@chakra-ui/react';
import {
  Avatar,
  Button,
  Card,
  Field,
  Image,
  Icon,
  Box,
} from '@chakra-ui/react';
import { avatarUrl, bannerUrl } from '@/api/discord';
import { SelectField } from '@/components/forms/SelectField';
import { SwitchField } from '@/components/forms/SwitchField';
import { languages, names, useLang } from '@/config/translations/provider';
import { profile } from '@/config/translations/profile';
import { IoLogOut } from 'react-icons/io5';
import { useSettingsStore } from '@/stores';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layout/app';
import { useLogoutMutation } from '@/utils/auth/hooks';
import { useSelfUser } from '@/api/hooks';
import { useTheme } from 'next-themes';

/**
 * User info and general settings here
 */
const ProfilePage: NextPageWithLayout = () => {
  const user = useSelfUser();
  const logout = useLogoutMutation();
  const t = profile.useTranslations();

  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const [devMode, setDevMode] = useSettingsStore((s) => [s.devMode, s.setDevMode]);

  return (
    <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 800px) auto' }} gap={{ base: 3, lg: 6 }}>
      <Flex direction="column">
        {user.banner != null ? (
          <Image
            alt="banner"
            src={bannerUrl(user.id, user.banner)}
            aspectRatio="1100 / 440"
            objectFit="cover"
            rounded="2xl"
          />
        ) : (
          <Box bg="Brand" rounded="2xl" aspectRatio="1100 / 440" />
        )}
        <VStack mt="-50px" ml="40px" align="start">
          <Avatar.Root
            w="100px"
            h="100px"
            css={{ '--ring-color': 'var(--chakra-colors-card-background)', '--ring-width': '6px' }}
          >
            {/* @ts-expect-error Chakra v3 types don't expose src on Avatar.Image */}
            <Avatar.Image src={avatarUrl(user)} />
            {/* @ts-expect-error Chakra v3 types don't include children on Avatar.Fallback */}
            <Avatar.Fallback>{user.username.slice(0, 2)}</Avatar.Fallback>
          </Avatar.Root>
          <Text fontWeight="600" fontSize="2xl">
            {user.username}
          </Text>
        </VStack>
      </Flex>
      <Card.Root w="full" rounded="3xl" h="fit-content" variant="elevated">
        <Card.Header fontSize="2xl" fontWeight="600">
          {t.settings}
        </Card.Header>
        <Card.Body as={Flex} direction="column" gap={6} mt={3}>
          <SwitchField
            id="dark-mode"
            label={t['dark mode']}
            desc={t['dark mode description']}
            checked={theme === 'dark'}
            onCheckedChange={(details) => setTheme(details.checked ? 'dark' : 'light')}
          />
          <SwitchField
            id="developer-mode"
            label={t['dev mode']}
            desc={t['dev mode description']}
            checked={devMode}
            onCheckedChange={(details) => setDevMode(details.checked)}
          />
          <Field.Root>
            <Box mb={2}>
              <Text as="label" fontSize="md" fontWeight="medium">
                {t.language}
              </Text>
              <Text color="TextSecondary">{t['language description']}</Text>
            </Box>
            <SelectField
              value={{
                label: names[lang],
                value: lang,
              }}
              onChange={(e) => e != null && setLang(e.value)}
              options={languages.map((lang) => ({
                label: lang.name,
                value: lang.key,
              }))}
            />
          </Field.Root>
          <Spacer />
          <Button
            colorPalette="red"
            loading={logout.isPending}
            onClick={() => logout.mutate()}
          >
            <Icon>
              <IoLogOut />
            </Icon>
            {t.logout}
          </Button>
        </Card.Body>
      </Card.Root>
      <Content />
    </Grid>
  );
};

function Content() {
  return <></>;
}

ProfilePage.getLayout = (p) => <AppLayout>{p}</AppLayout>;

export default ProfilePage;
