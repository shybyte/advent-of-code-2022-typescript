type FileNode = Folder | File;

interface Folder {
  name: string;
  children: FileNode[];
  size: number;
}

interface File {
  name: string;
  size: number;
}

export function solvePart1(input: string): number {
  const rootFolder = deriveFileSystem(input);
  const allFolders = flattenFolders(rootFolder);
  const smallFolders = allFolders.filter((folder) => folder.size <= 100_000);
  return sum(smallFolders.map((folder) => folder.size));
}

export function solvePart2(input: string): number {
  const rootFolder = deriveFileSystem(input);
  const allFolders = flattenFolders(rootFolder);

  allFolders.sort((f1, f2) => f1.size - f2.size);
  const freeSpace = 70_000_000 - rootFolder.size;
  const neededAdditionalFreeSpace = 30_000_000 - freeSpace;
  const folderToDelete = allFolders.find((folder) => folder.size >= neededAdditionalFreeSpace)!;
  return folderToDelete.size;
}

function calculateFolderSize(folder: /*mut*/ Folder) {
  folder.size = 0;

  for (const child of folder.children) {
    if (isFolder(child)) {
      calculateFolderSize(child);
    }
    folder.size += child.size;
  }
}

function flattenFolders(folder: Folder): Folder[] {
  const result: Folder[] = [folder];

  for (const child of folder.children) {
    if (isFolder(child)) {
      result.push(...flattenFolders(child));
    }
  }

  return result;
}

function deriveFileSystem(input: string): Folder {
  const rootFolder: Folder = { name: '', children: [], size: 0 };
  const lines = input.trim().split('\n');
  let folderStack: Folder[] = [rootFolder];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('$ cd')) {
      const argument = line.slice('$ cd'.length + 1).trim();
      folderStack = processCommandCd(argument, folderStack);
    } else if (line.startsWith('$ ls')) {
      i = processCommandLs(folderStack[folderStack.length - 1], lines, i);
    } else {
      throw new Error(`Invalid command "${line}"`);
    }
  }

  calculateFolderSize(rootFolder);
  return rootFolder;
}

function processCommandCd(argument: string, folderStack: Folder[]): Folder[] {
  switch (argument) {
    case '/':
      return folderStack.slice(0, 1);
    case '..':
      return folderStack.slice(0, folderStack.length - 1);
    default:
      const currentFolder = folderStack[folderStack.length - 1];
      const child = currentFolder.children.find((it) => it.name === argument);
      if (child && isFolder(child)) {
        return folderStack.concat(child);
      } else if (child && isFile(child)) {
        throw new Error(`cd ${argument} failed because ${argument} is not a folder but a file`);
      } else {
        return folderStack.concat({ name: argument, children: [], size: 0 });
      }
  }
}

/**
 * Modifies currentFolder
 * @return new inputIndex
 */
function processCommandLs(currentFolder: /*mut*/ Folder, inputLines: string[], currentInputIndex: number): number {
  let i = currentInputIndex;
  currentFolder.children = [];

  while (inputLines[i + 1] && !inputLines[i + 1].startsWith('$')) {
    i += 1;
    const lsOutputLine = inputLines[i].split(' ');
    if (lsOutputLine[0] === 'dir') {
      currentFolder.children.push({ name: lsOutputLine[1], children: [], size: 0 });
    } else {
      currentFolder.children.push({ name: lsOutputLine[1], size: parseInt(lsOutputLine[0]) });
    }
  }

  return i;
}

function isFolder(node: FileNode): node is Folder {
  return 'children' in node;
}

function isFile(node: FileNode): node is File {
  return !isFolder(node);
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
