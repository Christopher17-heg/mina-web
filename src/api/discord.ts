import { logout } from '@/utils/auth/hooks';
import { callReturn } from '@/utils/fetch/core';
import { discordRequest } from '@/utils/fetch/requests';

export type UserInfo = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

export type Guild = {
  id: string;
  name: string;
  icon: string;
  permissions: string;
};

export type IconHash = string;

export const PermissionFlags = {
  CREATE_INSTANT_INVITE: 1n << 0n,
  KICK_MEMBERS: 1n << 1n,
  BAN_MEMBERS: 1n << 2n,
  ADMINISTRATOR: 1n << 3n,
  MANAGE_CHANNELS: 1n << 4n,
  MANAGE_GUILD: 1n << 5n,
  ADD_REACTIONS: 1n << 6n,
  VIEW_AUDIT_LOG: 1n << 7n,
  PRIORITY_SPEAKER: 1n << 8n,
  STREAM: 1n << 9n,
  VIEW_CHANNEL: 1n << 10n,
  SEND_MESSAGES: 1n << 11n,
  SEND_TTS_MESSAGES: 1n << 12n,
  MANAGE_MESSAGES: 1n << 13n,
  EMBED_LINKS: 1n << 14n,
  ATTACH_FILES: 1n << 15n,
  READ_MESSAGE_HISTORY: 1n << 16n,
  MENTION_EVERYONE: 1n << 17n,
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  VIEW_GUILD_INSIGHTS: 1n << 19n,
  CONNECT: 1n << 20n,
  SPEAK: 1n << 21n,
  MUTE_MEMBERS: 1n << 22n,
  DEAFEN_MEMBERS: 1n << 23n,
  MOVE_MEMBERS: 1n << 24n,
  USE_VAD: 1n << 25n,
  CHANGE_NICKNAME: 1n << 26n,
  MANAGE_NICKNAMES: 1n << 27n,
  MANAGE_ROLES: 1n << 28n,
  MANAGE_WEBHOOKS: 1n << 29n,
  MANAGE_EMOJIS_AND_STICKERS: 1n << 30n,
  USE_APPLICATION_COMMANDS: 1n << 31n,
  REQUEST_TO_SPEAK: 1n << 32n,
  MANAGE_EVENTS: 1n << 33n,
  MANAGE_THREADS: 1n << 34n,
  CREATE_PUBLIC_THREADS: 1n << 35n,
  CREATE_PRIVATE_THREADS: 1n << 36n,
  USE_EXTERNAL_STICKERS: 1n << 37n,
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
  USE_EMBEDDED_ACTIVITIES: 1n << 39n,
  MODERATE_MEMBERS: 1n << 40n,
} as const;

export enum ChannelTypes {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
}

export async function fetchUserInfo(accessToken: string) {
  return await callReturn<UserInfo>(
    `/users/@me`,
    discordRequest(accessToken, {
      request: {
        method: 'GET',
      },
      allowed: {
        401: async () => {
          await logout();

          throw new Error('Not logged in');
        },
      },
    })
  );
}

export async function getGuilds(accessToken: string) {
  return await callReturn<Guild[]>(
    `/users/@me/guilds`,
    discordRequest(accessToken, { request: { method: 'GET' } })
  );
}

export async function getGuild(accessToken: string, id: string) {
  return await callReturn<Guild>(
    `/guilds/${id}`,
    discordRequest(accessToken, { request: { method: 'GET' } })
  );
}

export function iconUrl(guild: Guild) {
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
}

export function avatarUrl(user: UserInfo) {
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=512`;
}

export function bannerUrl(id: string, banner: string): string {
  return `https://cdn.discordapp.com/banners/${id}/${banner}?size=1024`;
}
