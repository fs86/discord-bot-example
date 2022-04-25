import { Guild } from '@viewmodels/discord';
import axios from 'axios';

export async function getGuilds(): Promise<Guild[]> {
  var response = await axios.get<Guild[]>('https://discord.com/api/users/@me/guilds');
  return response.data;
}
