import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GuildSelectionDialog } from '@components';
import { usePersistedState } from '@hooks';
import { Guild } from '@viewmodels/discord';

interface GuildSelectionContextProviderProps {
  children?: ReactNode;
}

interface GuildSelectionContextType {
  selectedGuild: Guild | undefined;
  setSelectedGuild: (guild: Guild) => void;
  showGuildSelection: () => void;
}

const GuildSelectionContext = createContext({} as GuildSelectionContextType);

export const GuildSelectionContextProvider = ({ children }: GuildSelectionContextProviderProps) => {
  const [guild, setGuild] = usePersistedState<Guild>('selectedGuild', 'session');
  const [dialogVisible, setDialogVisible] = useState(false);

  function showGuildSelection() {
    setDialogVisible(true);
  }

  function handleOnCancel() {
    setDialogVisible(false);
  }

  function handleOnOk() {
    setDialogVisible(false);
  }

  const contextValue = {
    selectedGuild: guild,
    setSelectedGuild: setGuild,
    showGuildSelection: showGuildSelection,
  };

  return (
    <GuildSelectionContext.Provider value={contextValue}>
      <GuildSelectionDialog visible={dialogVisible} onCancel={handleOnCancel} onOk={handleOnOk} />
      {children}
    </GuildSelectionContext.Provider>
  );
};

export function useGuildSelection() {
  const context = useContext(GuildSelectionContext);

  if (!context) {
    throw new Error('useGuildSelection must be used within a GuildSelectionContextProvider.');
  }

  return context;
}
