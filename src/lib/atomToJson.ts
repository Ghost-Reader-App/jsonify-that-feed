import { getStringFromAttr } from './utils';
import type { atomFeedType, jsonFeedItemType, jsonFeedAuthorsType, jsonFeedType } from '../types';

const atomToJson = (atom: atomFeedType): jsonFeedType => {
  if (!Array.isArray(atom.entry)) {
    atom.entry = [atom.entry];
  }

  const atomFeed: jsonFeedType = {
    version: 'https://jsonfeed.org/version/1.1',
    title: getStringFromAttr(atom.title),
    description: atom.subtitle || '',
    items: atom.entry.map((item) => {
      const rssItem: jsonFeedItemType = {
        title: getStringFromAttr(item.title),
        id: item.id,
      };
      if (item.link) {
        rssItem.url = Array.isArray(item.link) ? item.link[0].href : item.link.href;
      }
      if (item.published) {
        rssItem.date_published = item.published;
      }
      if (item.updated) {
        rssItem.date_modified = item.updated;
      }
      if (item.summary) {
        rssItem.summary = item.summary;
      }
      if (item.content) {
        rssItem.content_html = getStringFromAttr(item.content);
      }
      if (item.category) {
        rssItem.tags = Array.isArray(item.category) ? item.category.map((c) => c.term) : [item.category.term];
      }
      if (item.author) {
        if (!Array.isArray(item.author)) {
          item.author = [item.author];
        }
        rssItem.authors = item.author.map((a) => {
          const author: jsonFeedAuthorsType = { name: a.name };
          if (a.uri) {
            author.url = a.uri;
          }
          return author;
        });
      } else if (item.contributor) {
        if (!Array.isArray(item.contributor)) {
          item.contributor = [item.contributor];
        }
        rssItem.authors = item.contributor.map((name) => ({ name }));
      }
      if (item['media:thumbnail']) {
        rssItem.image = item['media:thumbnail'].url;
      }
      return rssItem;
    }),
  };

  if (atom.link) {
    if (Array.isArray(atom.link)) {
      const link = atom.link.find((l) => l.rel === 'self');
      atomFeed.feed_url = link ? link.href : atom.link[0].href;
    } else {
      atomFeed.feed_url = atom.link.href;
    }
  }

  if (atom.author) {
    atomFeed.authors = Array.isArray(atom.author) ? atom.author : [atom.author];
  }

  if (atom.logo) {
    atomFeed.icon = atom.logo;
  }

  return atomFeed;
};

export default atomToJson;
