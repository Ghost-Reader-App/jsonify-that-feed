import type { jsonFeedType } from '../types';

const json1Upgrade = (json: jsonFeedType): jsonFeedType => {
  json.version = 'https://jsonfeed.org/version/1.1';
  if (json.author && !json.authors) {
    json.authors = [json.author];
    delete json.author;
  }

  json.items = json.items.map((item) => {
    if (item.author && !item.authors) {
      item.authors = [item.author];
      delete item.author;
    }
    return item;
  });

  return json;
};

export default json1Upgrade;
