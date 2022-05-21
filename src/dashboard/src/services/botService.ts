import { endpoint } from '@helpers/apiHelper';
import { Guild } from '@viewmodels/discord';
import axios from 'axios';

export async function getGuilds(): Promise<Guild[]> {
  const response = await axios.get<Guild[]>(endpoint('/bot/guilds'));
  return response.data;
}

export async function updateGuild(guildId: string, prefix: string) {
  await axios.post(endpoint(`/bot/guilds/${guildId}?prefix=${prefix}`));
}
