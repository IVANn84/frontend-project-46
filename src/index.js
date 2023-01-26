import { cwd } from 'node:process';
import fs from 'fs';
import { resolve } from 'node:path';
import _ from 'lodash';

const getfilepath = (filepath) => resolve(cwd(), filepath);

const readFile = (path) => fs.readFileSync(path, 'utf-8');

const parsesFile = (file) => JSON.parse(file);

const getDiffInformation = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  console.log(data1, data2);

  const result = keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'delited',
        value: data1[key],
      };
    }
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'changet',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      key,
      type: 'unchanges',
      value: data1[key],
    };
  });
  console.log(result);
  return result;
};

const gendiff = (filepath1, filepath2) => {
  const informationDiff = getDiffInformation(
    parsesFile(readFile(getfilepath(filepath1))),
    parsesFile(readFile(getfilepath(filepath2))),
  );
  // console.log(informationDiff);
  const result = informationDiff.map((diff) => {
    const typeDiff = diff.type;
    switch (typeDiff) {
      case 'delited':
        return `  - ${diff.key}: ${diff.value}`;
      case 'unchanges':
        return `    ${diff.key}: ${diff.value}`;
      case 'changet':
        return `  - ${diff.key}: ${diff.value1} \n  + ${diff.key}: ${diff.value2}`;
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      default:
        return null;
    }
  });
  // console.log(`{\n${result.join('\n')}\n}`);
  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;
