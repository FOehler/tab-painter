import getSettings, { ColorMapping } from './getSettings';

export default (path: string): ColorMapping | undefined => {
  const { mappings, ignoreCase } = getSettings();
  if (!mappings || mappings.length < 1) {
    return undefined;
  }

  const map = mappings.find(mapping => new RegExp(mapping.regex, `g${ignoreCase ? 'i' : ''}`).test(path));
  if (!map) {
    return undefined;
  }

  return ({
    ...map,
    color: map.color
  });
};