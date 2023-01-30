import _ from 'lodash';

const IS_FULL = true;
const spacesCount = 4;
const replacer = ' ';

const indent = (depth, isFull = false) => {
  const indentSize = depth * spacesCount;
  return isFull ? replacer.repeat(indentSize) : replacer.repeat(indentSize - 2);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${indent(depth + 1, IS_FULL)}${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${indent(depth, IS_FULL)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed': {
      return `${indent(depth)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
    }
    case 'unchanged':
      return `${indent(depth, IS_FULL)}${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${indent(depth, IS_FULL)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${indent(depth, IS_FULL)}}`;
    }
    default:
      return null;
      // throw new Error(`Unknown type of node ${node.flag}.`);
  }
});

const formater = (tree) => {
  const result = iter(tree, 1);
  console.log(`{\n${result.join('\n')}\n}`);
  return `{\n${result.join('\n')}\n}`;
};
export default formater;
