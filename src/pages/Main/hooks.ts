import { useState, useEffect } from 'react';

async function initailDB(openDB: any, setLoading: (loading: boolean) => void) {
  try {
    const db = await openDB('online-player', 1, {
      upgrade(db: any, oldVersion: any, newVersion: any, transaction: any) {
        const handlesStore = db.createObjectStore('handles', {
          autoIncrement: false,
        });
        const listStore = db.createObjectStore('list', {
          autoIncrement: true,
        });
        const artistsStore = db.createObjectStore('artists', {
          autoIncrement: true,
        });
        const albumsStore = db.createObjectStore('albums', {
          autoIncrement: true,
        });
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export function useInitial(openDB: any) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    initailDB(openDB, setLoading);
  }, []);

  return { loading };
}
