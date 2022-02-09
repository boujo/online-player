import { useState, useEffect } from "react";
import { InfoType, ItemType } from "./types";

async function getList(
  openDB: any,
  artistKey: string,
  setInfo: (info: InfoType) => void,
  setList: (items: Array<ItemType>) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    // change logic later, after db schema changed.
    let info = { name: "" };
    let tracks = [];
    {
      const storeName = "artists";
      const db = await openDB("online-player", 1);
      const item = await db.get(storeName, Number(artistKey));
      info.name = item.name;
      tracks = item.tracks;
    }

    {
      const storeName = "list";
      const db = await openDB("online-player", 1);
      const items = [];
      for (let i = 0; i < tracks.length; i++) {
        const item = await db.get(storeName, tracks[i]);
        items.push({ ...item, key: tracks[i] });
      }
      setInfo(info);
      setList(items);
      setLoading(false);
    }
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
}

export function useArtist(openDB: any, key: string = "") {
  const [info, setInfo] = useState<InfoType>({ name: "" });
  const [list, setList] = useState<Array<ItemType>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getList(openDB, key, setInfo, setList, setLoading);
    return () => {};
  }, [key]);

  return { info, list, loading };
}
