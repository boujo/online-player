import { useState, useEffect } from 'react';
import { ItemType } from './types';

async function getList(
  openDB: any,
  setList: (items: Array<ItemType>) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    const storeName = 'list';
    const db = await openDB('online-player', 1);
    // const items = await db.getAll(storeName);
    const items = [];
    const keys = await db.getAllKeys(storeName);
    for (let i = 0; i < keys.length; i++) {
      const item = await db.get(storeName, keys[i]);
      items.push(item);
      items[i].key = keys[i];
    }

    setList(items);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
}

export function useTracks(openDB: any) {
  const [list, setList] = useState<Array<ItemType>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getList(openDB, setList, setLoading);
  }, []);

  return { list, loading };
}
