import parser from 'fast-xml-parser';
import atomToJson from './atomToJson';
import rssToJson from './rssToJson';
import json1Upgrade from './json1upgrade';
import type { atomFeedType, jsonFeedType, rssFeedType } from './types';

interface xmlType {
  rss?: { channel: rssFeedType };
  feed?: atomFeedType;
}

export const toJson = async (data: any): Promise<jsonFeedType> => {
  if (typeof data === 'object') {
    if (data.version === 'https://jsonfeed.org/version/1.1') {
      return data;
    } else if (data.version === 'https://jsonfeed.org/version/1') {
      return json1Upgrade(data);
    }
    throw new Error('Feed validation failure');
  }

  const validateRss = parser.validate(data);
  if (validateRss === true) {
    const jsonFeed: xmlType = parser.parse(data);
    if (jsonFeed.rss && jsonFeed.rss.channel) {
      return rssToJson(jsonFeed.rss.channel);
    } else if (jsonFeed.feed) {
      return atomToJson(jsonFeed.feed);
    }
    throw new Error('Unknown feed type');
  }
  throw new Error(
    validateRss && validateRss.err && validateRss.err.msg ? validateRss.err.msg : 'Feed validation failure'
  );
};

export default { toJson };
