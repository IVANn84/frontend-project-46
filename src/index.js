import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import parsesFile from './parsers.js';
import getTree from './getTree.js';
import formater from './stylish.js';

const readFile = (filepath) => {
  const fullFilePath = resolve(cwd(), filepath);
  const dataFile = fs.readFileSync(fullFilePath, 'utf-8');
  const extension = extname(filepath);
  return parsesFile(dataFile, extension);
};

const gendiff = (filepath1, filepath2) => {
  const informationDiff = getTree(readFile(filepath1), readFile(filepath2));
  console.log(informationDiff);

  return formater(informationDiff);
};

export default gendiff;
