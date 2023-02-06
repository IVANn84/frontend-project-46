import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import parsesFile from './parsers.js';
import getTree from './getTree.js';
import formatter from './formatters/index.js';

const getFullFilePath = (filepath) => resolve(cwd(), filepath);

const getExtension = (filepath) => extname(filepath).substring(1);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathFile1 = getFullFilePath(filepath1);
  const pathFile2 = getFullFilePath(filepath2);

  const dataFile1 = readFile(pathFile1);
  const dataFile2 = readFile(pathFile2);

  const extensionFile1 = getExtension(filepath1);
  const extensionFile2 = getExtension(filepath2);
  console.log(extensionFile1);

  const informationDiff = getTree(
    parsesFile(dataFile1, extensionFile1),
    parsesFile(dataFile2, extensionFile2),
  );

  return formatter(informationDiff, formatName);
};

export default gendiff;
