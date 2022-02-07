import { useState, useEffect } from "react";
import { InfoType, ItemType } from "./types";

async function getList(
  openDB: any,
  albumKey: string,
  setInfo: (info: InfoType) => void,
  setList: (items: Array<ItemType>) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    // change logic later, after db schema changed.
    let info = { name: "", artist: "", cover: "" };
    {
      const storeName = "albums";
      const db = await openDB("online-player", 1);
      const item = await db.get(storeName, Number(albumKey));
      info.name = item.name;
      info.artist = item.artist;
      info.cover = item.cover;
    }

    {
      const storeName = "list";
      const db = await openDB("online-player", 1);
      const items = [];
      const keys = await db.getAllKeys(storeName);
      for (let i = 0; i < keys.length; i++) {
        const item = await db.get(storeName, keys[i]);
        if (item.album === info.name) {
          items.push({ ...item, key: keys[i] });
        }
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

export function useAlbum(openDB: any, key: string = "") {
  const [info, setInfo] = useState<InfoType>({
    name: "",
    artist: "",
    cover: "",
  });
  const [list, setList] = useState<Array<ItemType>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getList(openDB, key, setInfo, setList, setLoading);
    return () => {};
  }, [key]);

  return { info, list, loading };
}
