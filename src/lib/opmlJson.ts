import type { opmlType } from '../types';

const opmlJson = (opml: opmlType): opmlType => {
  opml.version = 2;
  if (!Array.isArray(opml.body.outline)) {
    opml.body.outline = [opml.body.outline];
  }

  const outline = [];
  for (const o of opml.body.outline) {
    if (o.text) {
      outline.push(o);
      // @ts-ignore
    } else if (o.outline) {
      // @ts-ignore
      if (!Array.isArray(o.outline)) {
        // @ts-ignore
        o.outline = [o.outline];
      }
      // @ts-ignore
      for (const i of o.outline) {
        if (i.text) {
          outline.push(i);
        }
      }
    }
  }
  opml.body.outline = outline;

  return opml;
};

export default opmlJson;
