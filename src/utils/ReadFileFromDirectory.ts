async function readFileFromDirectoryRecursively(
  handle: any,
  pathSplit: any,
  currentPathIndex: any
): Promise<any> {
  let file = null;

  if (currentPathIndex === pathSplit.length - 1) {
    const fileHandle = await handle.getFileHandle(pathSplit[currentPathIndex], {
      create: false,
    });
    file = await fileHandle.getFile();
  } else {
    const subHandle = await handle.getDirectoryHandle(
      pathSplit[currentPathIndex],
      { create: false }
    );
    if (subHandle) {
      file = await readFileFromDirectoryRecursively(
        subHandle,
        pathSplit,
        currentPathIndex + 1
      );
    }
  }

  return file;
}

async function checkPermission(handle: any) {
  if ((await handle.queryPermission({ mode: 'read' })) === 'granted') {
    return true;
  }
  if ((await handle.requestPermission({ mode: 'read' })) === 'granted') {
    return true;
  }
  return false;
}

async function readFileFromDirectory(handle: any, path: any) {
  const pathSplit = path.split('/');
  const currentPathIndex = 0;
  let file = null;

  const hasPermission = await checkPermission(handle);

  if (hasPermission) {
    file = await readFileFromDirectoryRecursively(
      handle,
      pathSplit,
      currentPathIndex
    );
  }

  return file;
}

export { readFileFromDirectory };
