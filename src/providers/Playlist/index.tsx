import { useState, useMemo, useContext, createContext } from 'react';
import { ContextInterface, ProviderInterface, ItemType } from './types';

const PlaylistContext = createContext<ContextInterface>({
  list: [],
  add: () => {
    return null;
  },
  remove: () => {
    return null;
  },
  empty: () => {
    return null;
  },
});

export function PlaylistProvider({ initialData, children }: ProviderInterface) {
  const [list, setList] = useState<Array<ItemType>>(initialData || []);

  const value = useMemo<ContextInterface>(() => {
    function add(item: ItemType) {
      const newList = [...list];
      newList.push(item);
      setList(newList);
    }
    function remove(item: ItemType) {
      const newList = [...list];
      const index = newList.indexOf(item);
      if (index > -1) {
        newList.splice(index, 1);
      }
      setList(newList);
    }
    function empty() {
      setList([]);
    }
    return { list, add, remove, empty };
  }, [list]);

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error(
      'for access usePlayer, component must wrap with PlaylistProvider'
    );
  }

  return context;
}
