import { endpoint } from '@helpers/apiHelper';
import { Guild } from '@viewmodels/discord';
import axios from 'axios';

export async function getGuilds(): Promise<Guild[]> {
  const response = await axios.get<Guild[]>(endpoint('/guilds'));
  return response.data;
}

export async function updateGuild(guildId: string, settings: { botPrefix: string }) {
  await axios.post(endpoint(`/guilds/${guildId}`), settings);
}
