import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import parsesFile from './parsers.js';
import getTree from './getTree.js';
import formatter from './formatters/index.js';

const readFile = (filepath) => {
  const fullFilePath = resolve(cwd(), filepath);
  const dataFile = fs.readFileSync(fullFilePath, 'utf-8');
  const extension = extname(filepath);
  return parsesFile(dataFile, extension);
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const informationDiff = getTree(readFile(filepath1), readFile(filepath2));
  // console.log(informationDiff);

  return formatter(informationDiff, formatName);
};

export default gendiff;
