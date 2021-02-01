import mime from 'mime/lite';
import { getStringFromAttr } from './utils';
import type {
  jsonFeedAttachmentsType,
  jsonFeedItemType,
  jsonFeedType,
  rssFeedType,
  rssMediaContentType,
} from '../types';

const getAttachments = (item: rssMediaContentType[]): jsonFeedAttachmentsType[] => {
  const attachments = [];
  for (const a of item) {
    const mediaContent: jsonFeedAttachmentsType = {
      url: a.url,
      mime_type: a.type ? a.type : mime.getType('a.url') || 'application/octet-stream',
    };
    if (a.duration) {
      mediaContent.duration_in_seconds = a.duration;
    }
    if (a.fileSize) {
      mediaContent.size_in_bytes = a.fileSize;
    }
    attachments.push(mediaContent);
  }
  return attachments;
};

const rssToJson = (rss: rssFeedType): jsonFeedType => {
  if (!Array.isArray(rss.item)) {
    rss.item = [rss.item];
  }

  const rssFeed: jsonFeedType = {
    version: 'https://jsonfeed.org/version/1.1',
    title: getStringFromAttr(rss.title),
    feed_url: rss.link,
    description: rss.description,
    items: rss.item.map((item) => {
      const rssItem: jsonFeedItemType = {
        title: getStringFromAttr(item.title),
        url: item.link,
        id: item.guid ? getStringFromAttr(item.guid) : item.link ? item.link : item.title,
      };
      if (item.pubDate) {
        rssItem.date_published = item.pubDate;
      }
      if (item.description) {
        rssItem.summary = getStringFromAttr(item.description);
      }
      if (item['content:encoded']) {
        rssItem.content_html = getStringFromAttr(item['content:encoded']);
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
        if (Array.isArray(item['media:content'])) {
          rssItem.attachments = getAttachments(item['media:content']);
        } else {
          if (item['media:content'].medium === 'image') {
            rssItem.image = item['media:content'].url;
          } else {
            rssItem.attachments = getAttachments([item['media:content']]);
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
