import { XMLParser, XMLValidator, XMLBuilder } from 'fast-xml-parser';
import atomToJson from './atomToJson';
import rssToJson from './rssToJson';
import json1Upgrade from './json1upgrade';
import opmlJson from './opmlJson';
import type { atomFeedType, jsonFeedType, rssFeedType, opmlType } from '../types';

interface xmlType {
  rss?: { channel: rssFeedType };
  feed?: atomFeedType;
  opml?: opmlType;
}

const xmlParserOptions = {
  attributeNamePrefix: '',
  ignoreAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
};

export const toJson = (data: any): jsonFeedType => {
  if (typeof data === 'object') {
    if (data.version === 'https://jsonfeed.org/version/1.1') {
      return data;
    } else if (data.version === 'https://jsonfeed.org/version/1') {
      return json1Upgrade(data);
    }
    throw new Error('Feed validation failure');
  }

  const validateRss = XMLValidator.validate(data);
  if (validateRss === true) {
    // fast-xml-parser decodes entities itself while parsing, decoding the
    // document here would corrupt element text into child nodes
    const jsonFeed: xmlType = new XMLParser(xmlParserOptions).parse(data);
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

export const opmlToJson = (data: string): opmlType => {
  data = data.trim();
  const validateOpml = XMLValidator.validate(data);
  if (validateOpml === true) {
    const opmlFeed: xmlType = new XMLParser(xmlParserOptions).parse(data);
    if (opmlFeed.opml && opmlFeed.opml.body && opmlFeed.opml.body.outline) {
      return opmlJson(opmlFeed.opml);
    }
    throw new Error('Unknown opml type');
  }
  throw new Error(
    validateOpml && validateOpml.err && validateOpml.err.msg ? validateOpml.err.msg : 'Opml validation failure'
  );
};

export const jsonToOpml = (data: opmlType): string => {
  // fast-xml-parser v5 escapes text and attribute values itself, the v3 era
  // custom entity processors would double-encode here
  return new XMLBuilder({ format: true }).build({ opml: data });
};
