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
    } else if (o.outline) {
      // an outline group without its own text carries nested outlines
      if (!Array.isArray(o.outline)) {
        o.outline = [o.outline];
      }
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
