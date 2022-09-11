import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import _ from 'lodash';

const getfilePath = (filePath) => resolve(cwd(), filePath);

const readFile = (path) => readFileSync(path);

const parsesFile = (file) => JSON.parse(file);

const gendiff = (filePath1, filePath2) => {
  const path1 = getfilePath(filePath1);
  const path2 = getfilePath(filePath2);

  const file1 = readFile(path1);
  const file2 = readFile(path2);

  const data1 = parsesFile(file1);
  const data2 = parsesFile(file2);
  console.log(data1);
  console.log(data2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keys = _.sortBy(_.union(keys1, keys2));
  console.log(keys);
  const result = {};

  for (const key of keys) {
    if (_.has(data1, [key])) {
      result[`- ${key}`] = data1[key];
    } else if (_.has(data2, [key])) {
      result[`+ ${key}`] = data2[key];
    } else if (
      _.has(data1, [key]) &&
      _.has(data2, [key] && data1[key] === data2[key])
    ) {
      result[key] = data1[key];
    }
  }
  console.log(result);

  return result;
};

gendiff('../__fixtures__/file1.json', '../__fixtures__/file2.json');
export default gendiff;
