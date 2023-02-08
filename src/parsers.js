import YAML from 'js-yaml';

export default (dataFile, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(dataFile);
    case 'yml':
      return YAML.load(dataFile);
    case 'yaml':
      return YAML.load(dataFile);
    default:
      throw new Error(`'Unknown format! ${format}'`);
  }
};
