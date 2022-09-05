#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');
const diff = genDiff(filepath1, filepath2);

program.parse();
