interface attrType {
  '#text': string;
  type: string;
}

export const getStringFromAttr = (val: string | attrType): string => {
  if (typeof val === 'object') {
    return val['#text'] + '';
  }
  return val + '';
};
