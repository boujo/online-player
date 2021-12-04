
async function getFilesListFromDirectoryRecursively(list, relativePath, handle, types, maxLevel, currentLevel) {
  if (currentLevel <= maxLevel) {
    for await (const [name, subHandle] of handle.entries()) {
      // console.log(name, subHandle)
      if (subHandle.kind === 'file') {
        const nameSplit = name.split('.');
        const postfix = nameSplit[nameSplit.length - 1];
        if (types.includes(postfix)) {
          list.push({ path: (relativePath + name) });
        }
      } else if (subHandle.kind === 'directory') {
        const subRelativePath = relativePath + name + '/';
        await getFilesListFromDirectoryRecursively(list, subRelativePath, subHandle, types, maxLevel, currentLevel + 1);
      }
  
      console.log('')
    }
  }
}

async function getFilesListFromDirectory(handle, types, maxLevel = 3, currentLevel = 1) {
  const list = [];
  const relativePath = '';

  await getFilesListFromDirectoryRecursively(list, relativePath, handle, types, maxLevel, currentLevel);

  return list;
}

export { getFilesListFromDirectory };