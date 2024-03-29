import { endpoint } from '@helpers/apiHelper';
import { GuildChannel, GuildSettings } from '@viewmodels';
import { Guild } from '@viewmodels/discord';
import axios from 'axios';

export async function getGuilds(): Promise<Guild[]> {
  const response = await axios.get<Guild[]>(endpoint('/guilds'));
  return response.data;
}

export async function getGuildSettings(guildId: string) {
  const response = await axios.get<GuildSettings>(endpoint(`/guilds/${guildId}/settings`));
  return response.data;
}

export async function updateGuildSettings(guildId: string, settings: GuildSettings) {
  return await axios.post(endpoint(`/guilds/${guildId}/settings`), settings);
}

export async function getGuildTextChannels(guildId: string) {
  const response = await axios.get<GuildChannel[]>(endpoint(`/guilds/${guildId}/textchannels`));
  return response.data;
}
