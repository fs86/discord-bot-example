import { endpoint } from '@helpers/apiHelper';
import { GuildSettings } from '@viewmodels';
import { Guild } from '@viewmodels/discord';
import axios from 'axios';

export async function getGuilds(): Promise<Guild[]> {
  const response = await axios.get<Guild[]>(endpoint('/guilds'));
  return response.data;
}

export async function updateGuildSettings(guildId: string, settings: GuildSettings) {
  await axios.post(endpoint(`/guilds/${guildId}/settings`), settings);
}

export async function getGuildSettings(guildId: string) {
  const response = await axios.get<GuildSettings>(endpoint(`/guilds/${guildId}/settings`));
  return response.data;
}
