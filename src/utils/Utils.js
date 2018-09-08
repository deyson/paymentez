import { upperFirst } from 'lodash/string';

export function toTitle(str) {
  return str.split(/-|[A-Z]+/).reduce((s, split) => {
    const capititalized = split.match(/svg$/) ? 'SVG' : upperFirst(split);
    return `${s ? `${s} ` : ''}${capititalized}`;
  }, '');
}

export function date() { }
