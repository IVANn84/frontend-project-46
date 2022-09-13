import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import _ from 'lodash';

const getfilePath = (filePath) => resolve(cwd(), filePath);

const readFile = (path) => readFileSync(path, 'utf-8');

const parsesFile = (file) => JSON.parse(file);

const getDiffInformation = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isEqual(value1, value2)) {
      return {
        type: 'unchanges',
        key,
        value: value1,
      };
    }
    if (value1 && value2 && value1 !== value2) {
      return {
        type: 'changet',
        key,
        value1,
        value2,
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        type: 'delited',
        key,
        value: value1,
      };
    }
    if (!Object.hasOwn(data1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }
  });
  return result;
};
const gendiff = (filePath1, filePath2) => {
  const path1 = getfilePath(filePath1);
  const path2 = getfilePath(filePath2);

  const file1 = readFile(path1);
  const file2 = readFile(path2);

  const data1 = parsesFile(file1);
  const data2 = parsesFile(file2);

  const informationDiff = getDiffInformation(data1, data2);
  console.log(informationDiff);
  const result = informationDiff.map((diff) => {
    const typeDiff = diff.type;
    switch (typeDiff) {
      case 'delited':
        return `- ${diff.key}: ${diff.value}`;
      case 'unchanges':
        return `  ${diff.key}: ${diff.value}`;
      case 'changet':
        return `- ${diff.key}: ${diff.value1} \n +${diff.key}: ${diff.value2}`;
      case 'added':
        return `+ ${diff.key}: ${diff.value1}`;
    }
  });
  console.log(result);
  return `{\n${result.join('\n')}\n}`;
};

gendiff('../__fixtures__/file1.json', '../__fixtures__/file2.json');

export default gendiff;
