import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'node:path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const fileOutput = readFile('fileOutput.txt');
const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';

test('plan using', () => {
  expect(gendiff(file1, file2)).toEqual(fileOutput);
});
