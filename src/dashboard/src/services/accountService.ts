import { Guild } from '@viewmodels/discord';
import axios from 'axios';

export async function getGuilds(): Promise<Guild[]> {
  var response = await axios.get<Guild[]>(`${process.env.REACT_APP_API_URL}/account`);
  return response.data;
}
