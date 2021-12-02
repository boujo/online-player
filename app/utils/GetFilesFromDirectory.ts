
async function getFilesFromDirectoryRecursively(list, relativePath, handle, type, maxLevel, currentLevel) {
  if (currentLevel <= maxLevel) {
    for await (const [name, subHandle] of handle.entries()) {
      console.log('===== =====')
      console.log(name, subHandle)
      console.log('kind', subHandle.kind)
  
      if (subHandle.kind === 'file') {
        // const fileData = await subHandle.getFile();
        // console.log(fileData)
        list.push((relativePath + name));
      } else if (subHandle.kind === 'directory') {
        const subRelativePath = relativePath + name + '/';
        await getFilesFromDirectoryRecursively(list, subRelativePath, subHandle, type, maxLevel, currentLevel + 1);
      }
  
      console.log('')
    }
  }
}

async function getFilesFromDirectory(handle, type, maxLevel = 3, currentLevel = 1) {
  const list = [];
  const relativePath = '';

  await getFilesFromDirectoryRecursively(list, relativePath, handle, type, maxLevel, currentLevel);

  return list;
}

export { getFilesFromDirectory };