import YAML from 'js-yaml';

export default (dataFile, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(dataFile);
    case '.yml':
      return YAML.load(dataFile);
    case '.yaml':
      return YAML.load(dataFile);
    default:
      return null;
  }
};
