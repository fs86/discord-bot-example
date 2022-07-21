export interface GuildSettings {
  botPrefix?: string;
  botNickname?: string;
  blacklist?: string[];
  welcomeChannelId?: string;
  welcomeMessage?: string;
  leaveChannelId?: string;
  leaveMessage?: string;
}
