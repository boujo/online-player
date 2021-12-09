import jsmediatags from "jsmediatags";
import { openDB } from "idb";
import {
  readFileFromDirectory
} from './';

type MediaTags = {
  album: string,
  artist: string,
  title: string,
  cover: string,
};

function getMediaTags(file: File) {
  return new Promise<MediaTags>((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess: function(result) {
        if (result && result.tags) {
          let cover = null;
  
          if (result.tags.picture) {
            const { data, format } = result.tags.picture;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            cover = `data:${format};base64,${window.btoa(base64String)}`;
          }

          resolve({
            album: result.tags.album || '',
            artist: result.tags.artist || '',
            title: result.tags.title || '',
            cover: cover || '',
          });
        }
      },
      onError: function(error) {
        reject(error);
      }
    });
  });
}

async function getFileInfo(fileKey: number) {
  try {
    const db = await openDB('online-player', 1);

    const fileData = await db.get('list', fileKey);
  
    const handle = await db.get('handles', 'rootHandle');
  
    const file = await readFileFromDirectory(handle, fileData.path);
  
    const mediaTags = await getMediaTags(file);
  
    const info = {
      name: file.name,
      url: URL.createObjectURL(file),
      album: mediaTags.album,
      artist: mediaTags.artist,
      title: mediaTags.title,
      cover: mediaTags.cover,
      dominantColor: fileData.dominantColor
    };
  
    return info;
  } catch (error) {
    throw new Error(error);
  }
}

export { getFileInfo };