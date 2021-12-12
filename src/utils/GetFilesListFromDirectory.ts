import jsmediatags from 'jsmediatags';

import {
  compressImage,
  getDominantColor
} from './';

interface Info {
  name: string,
  album: string,
  artist: string,
  title: string,
  dominantColor: { r: number, g: number, b: number },
  cover: string | null,
}

interface InfoExtended extends Info {
  path: string,
}

function getFileInfo(file: File): Promise<Info> {
  return new Promise((resolve, reject) => {
    if (file) {
      jsmediatags.read(file, {
        onSuccess: async function(result: any) {
          if (result.tags) {
            // get cover photo
            let cover = null;
            let dominantColor = { r: 0, g: 0, b: 0 };
            if (result.tags.picture) {
              const { data, format } = result.tags.picture;
              dominantColor = await getDominantColor(data, format);
              // reduce image size
              const compressedData = await compressImage(data, format);
              let base64String = "";
              for (let i = 0; i < compressedData.length; i++) {
                base64String += String.fromCharCode(compressedData[i]);
              }
              cover = `data:${format};base64,${window.btoa(base64String)}`;
            }
            // end of get cover photo

            resolve({
              name: file.name,
              album: result.tags.album,
              artist: result.tags.artist,
              title: result.tags.title,
              dominantColor,
              cover,
            });
          } else {
            reject('no result');
          }
        },
        onError: function(error) {
          reject(error);
        }
      });
      // end of jsmediatags
    }
    // end of file check
  });
  // end of promise
}

async function getFilesListFromDirectoryRecursively(list: any, relativePath: any, handle: any, types: any, maxLevel: any, currentLevel: any): Promise<void> {
  if (currentLevel <= maxLevel) {
    for await (const [name, subHandle] of handle.entries()) {
      if (subHandle.kind === 'file') {
        // check postfix
        const nameSplit = name.split('.');
        const postfix = nameSplit[nameSplit.length - 1];
        if (types.includes(postfix)) {
          const file = await subHandle.getFile();
          const info = await getFileInfo(file);
          list.push({ path: (relativePath + name), ...info });
        }
      } else if (subHandle.kind === 'directory') {
        const subRelativePath = relativePath + name + '/';
        await getFilesListFromDirectoryRecursively(list, subRelativePath, subHandle, types, maxLevel, currentLevel + 1);
      }
    }
  }
}

async function getFilesListFromDirectory(handle: any, types: any, maxLevel: any = 3, currentLevel: any = 1): Promise<any> {
  const list: any = [];
  const relativePath = '';

  await getFilesListFromDirectoryRecursively(list, relativePath, handle, types, maxLevel, currentLevel);

  return list;
}

export { getFilesListFromDirectory };