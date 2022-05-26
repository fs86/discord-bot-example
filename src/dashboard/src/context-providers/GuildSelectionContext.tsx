import { createContext, ReactNode, useContext, useState } from 'react';
import { Guild } from '@viewmodels/discord';

interface GuildSelectionContextProviderProps {
  children?: ReactNode;
}

interface GuildSelectionContextType {
  selectedGuild: Guild | undefined;
  setSelectedGuild: (guild: Guild) => void;
}

const GuildSelectionContext = createContext({} as GuildSelectionContextType);

export const GuildSelectionContextProvider = ({ children }: GuildSelectionContextProviderProps) => {
  const [guild, setGuild] = useState<Guild>();

  const contextValue = {
    selectedGuild: guild,
    setSelectedGuild: setGuild,
  };

  return (
    <GuildSelectionContext.Provider value={contextValue}>{children}</GuildSelectionContext.Provider>
  );
};

export function useGuildSelection() {
  const context = useContext(GuildSelectionContext);

  if (!context) {
    throw new Error('useGuildSelection must be used within a GuildSelectionContextProvider.');
  }

  return context;
}
