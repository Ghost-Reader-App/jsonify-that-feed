import type { jsonFeedType } from './types';

const json1Upgrade = (json: jsonFeedType): jsonFeedType => {
  if (json.author && !json.authors) {
    json.authors = [json.author];
  }

  json.items = json.items.map((item) => {
    if (item.author && !item.authors) {
      item.authors = [item.author];
    }
    return item;
  });

  return json;
};

export default json1Upgrade;
