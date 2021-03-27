import { Production } from "./Production";

export const separateLines = (string: string): Array<string> => {
  return string.replace(/^\n/gm, "").replace(/\n$/gm, "").split(/\n/gm);
};
export const parseSpaceToEpson = (string: string): string => {
  return string.replace(/\s+/gm, "ε");
};

export const removeNonTerminalsAndEpson = (string: string): string => {
  return string.replace(/[A-Z|ε]/gm, "");
};

export const removeSpaces = (string: string): string => {
  return string.replace(/\s/g, "");
};
export const removeTerminals = (string: string): Array<string> => {
  return string.replace(/[^A-Z]/gm, "").split("");
};
export const removeNonTerminals = (string: string): Array<string> => {
  return parseSpaceToEpson(string.replace(/[A-Z]/gm, "")).split("");
};
export const parseStringToProductions = (
  grammaString: string
): Array<Production> => {
  const productionsString = separateLines(grammaString);
  const productions: Array<Production> = [];
  productionsString.forEach((productionString) => {
    const production = new Production(productionString);
    productions.push(production);
  });
  return productions;
};

export const hasDuplicates = (array: Array<string>): boolean => {
  return new Set(array).size !== array.length;
};
