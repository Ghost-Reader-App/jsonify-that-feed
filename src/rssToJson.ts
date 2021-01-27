import type { jsonFeedAttachmentsType, jsonFeedItemType, jsonFeedType, rssFeedType } from './types';

const rssToJson = (rss: rssFeedType): jsonFeedType => {
  if (!Array.isArray(rss.item)) {
    rss.item = [rss.item];
  }

  const rssFeed: jsonFeedType = {
    version: 'https://jsonfeed.org/version/1.1',
    title: rss.title,
    feed_url: rss.link,
    description: rss.description,
    items: rss.item.map((item) => {
      const rssItem: jsonFeedItemType = {
        title: item.title,
        url: item.link,
        id: item.guid ? item.guid['#text'] : item.link ? item.link : item.title,
      };
      if (item.pubDate) {
        rssItem.date_published = item.pubDate;
      }
      if (item.description) {
        rssItem.summary = item.description;
      }
      if (item['content:encoded']) {
        rssItem.content_html = item['content:encoded'];
      }
      if (item['dc:creator']) {
        if (!Array.isArray(item['dc:creator'])) {
          item['dc:creator'] = [item['dc:creator']];
        }
        rssItem.authors = item['dc:creator'].map((name) => ({ name }));
      }
      if (item.category) {
        rssItem.tags = Array.isArray(item.category) ? item.category : [item.category];
      }
      if (item.enclosure) {
        rssItem.attachments = [
          {
            url: item.enclosure.url,
            size_in_bytes: item.enclosure.length,
            mime_type: item.enclosure.type,
          },
        ];
      } else if (item['media:content']) {
        if (!Array.isArray(item['media:content'])) {
          item['media:content'] = [item['media:content']];
        }
        rssItem.attachments = [];
        for (const a of item['media:content']) {
          if (a.type) {
            const mediaContent: jsonFeedAttachmentsType = { url: a.url, mime_type: a.type };
            if (a.duration) {
              mediaContent.duration_in_seconds = a.duration;
            }
            if (a.fileSize) {
              mediaContent.size_in_bytes = a.fileSize;
            }
            rssItem.attachments.push(mediaContent);
          }
        }
      }
      return rssItem;
    }),
  };

  if (rss['sy:updatePeriod']) {
    rssFeed.updatePeriod = rss['sy:updatePeriod'];
  }
  if (rss['sy:updateFrequency']) {
    rssFeed.updateFrequency = rss['sy:updateFrequency'];
  }

  return rssFeed;
};

export default rssToJson;