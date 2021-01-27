/**
 * `media:content` is a sub-element of either `item` or `media:group`. Media objects that are not the same content should not be included in the same <media:group> element. The sequence of these items implies the order of presentation. While many of the attributes appear to be audio/video specific, this element can be used to publish any type of media. It contains 14 attributes, most of which are optional.
 */
export interface rssMediaContentType {
  /**
   * url should specify the direct URL to the media object. If not included, a `media:player` element must be specified.
   */
  url: string;
  /**
   * fileSize is the number of bytes of the media object. It is an optional attribute.
   */
  fileSize?: number;
  /**
   * type is the standard MIME type of the object. It is an optional attribute.
   */
  type?: string;
  /**
   * medium is the type of object (image | audio | video | document | executable). While this attribute can at times seem redundant if type is supplied, it is included because it simplifies decision making on the reader side, as well as flushes out any ambiguities between MIME type and object type. It is an optional attribute.
   */
  medium?: 'image' | 'audio' | 'video' | 'document' | 'executable';
  /**
   * expression determines if the object is a sample or the full version of the object, or even if it is a continuous stream (sample | full | nonstop). Default value is "full". It is an optional attribute.
   */
  expression?: 'sample' | 'full' | 'nonstop';
  /**
   * bitrate is the kilobits per second rate of media. It is an optional attribute.
   */
  bitrate?: number;
  /**
   * framerate is the number of frames per second for the media object. It is an optional attribute.
   */
  framerate?: number;
  /**
   * samplingrate is the number of samples per second taken to create the media object. It is expressed in thousands of samples per second (kHz). It is an optional attribute.
   */
  samplingrate?: number;
  /**
   * channels is number of audio channels in the media object. It is an optional attribute.
   */
  channels?: number;
  /**
   * duration is the number of seconds the media object plays. It is an optional attribute.
   */
  duration?: number;
  /**
   * height is the height of the media object. It is an optional attribute.
   */
  height?: number;
  /**
   * width is the width of the media object. It is an optional attribute.
   */
  width?: number;
  /**
   * lang is the primary language encapsulated in the media object. Language codes possible are detailed in RFC 3066. This attribute is used similar to the xml:lang attribute detailed in the XML 1.0 Specification (Third Edition). It is an optional attribute.
   */
  lang?: string;
}

/**
 * A channel may contain any number of **item**'s. An item may represent a "story" -- much like a story in a newspaper or magazine; if so its description is a synopsis of the story, and the link points to the full story. An item may also be complete in itself, if so, the description contains the text (entity-encoded HTML is allowed), and the link and title may be omitted. All elements of an item are optional, however at least one of title or description must be present.
 */
export interface rssItemType {
  /**
   * The title of the item.
   */
  title: string;
  /**
   * The URL of the item.
   */
  link?: string;
  /**
   * The item synopsis.
   */
  description?: string;
  /**
   * Email address of the author of the item. More.
   */
  author?: string;
  /**
   * 	Includes the item in one or more categories.
   */
  category: string | string[];
  /**
   * The dc:creator element identifies the person or entity who wrote an item (OPTIONAL). An item MAY contain more than one dc:creator element to credit multiple authors.
   */
  'dc:creator'?: string | string[];
  /**
   * URL of a page for comments relating to the item.
   */
  comments?: string;
  /**
   * The slash:comments element contains a non-negative integer that counts the number of comments that an item has received (OPTIONAL).
   */
  'slash:comments'?: number;
  /**
   * Describes a media object that is attached to the item.
   * It has three required attributes. url says where the enclosure is located, length says how big it is in bytes, and type says what its type is, a standard MIME type.
   */
  enclosure?: {
    url: string;
    length: number;
    type: string;
  };
  /**
   * Media RSS is a new RSS module that supplements the <enclosure> capabilities of RSS 2.0. RSS enclosures are already being used to syndicate audio files and images. Media RSS extends enclosures to handle other media types, such as short films or TV, as well as provide additional metadata with the media. Media RSS enables content publishers and bloggers to syndicate multimedia content such as TV and video clips, movies, images and audio.
   */
  'media:content'?: rssMediaContentType | rssMediaContentType[];
  /**
   * A string that uniquely identifies the item. More.
   */
  guid?: {
    '#text': string;
    isPermaLink: 'true' | 'false';
  };
  'post-id'?: string | number;
  /**
   * Indicates when the item was published. More.
   */
  pubDate?: Date;
  /**
   * The RSS channel that the item came from. More.
   */
  source?: string;
  /**
   * The content:encoded element defines the full content of an item (OPTIONAL). This element has a more precise purpose than the description element, which can be the full content, a summary or some other form of excerpt at the publisher's discretion.
   */
  'content:encoded'?: string;
}

export interface rssFeedType {
  /**
   * The name of the channel. It's how people refer to your service. If you have an HTML website that contains the same information as your RSS file, the title of your channel should be the same as the title of your website.
   */
  title: string;
  /**
   * The URL to the HTML website corresponding to the channel.
   */
  link: string;
  /**
   * Phrase or sentence describing the channel.
   */
  description: string;
  /**
   * The language the channel is written in. This allows aggregators to group all Italian language sites, for example, on a single page. A list of allowable values for this element, as provided by Netscape, is here. You may also use values defined by the W3C.
   */
  language?: string;
  /**
   * Copyright notice for content in the channel.
   */
  copyright?: string;
  /**
   * Email address for person responsible for editorial content.
   */
  managingEditor?: string;
  /**
   * Email address for person responsible for technical issues relating to channel.
   */
  webmaster?: string;
  /**
   * The publication date for the content in the channel. For example, the New York Times publishes on a daily basis, the publication date flips once every 24 hours. That's when the pubDate of the channel changes. All date-times in RSS conform to the Date and Time Specification of RFC 822, with the exception that the year may be expressed with two characters or four characters (four preferred).
   */
  pubDate?: Date;
  /**
   * The last time the content of the channel changed.
   */
  lastBuildDate?: Date;
  /**
   * Specify one or more categories that the channel belongs to. Follows the same rules as the <item>-level category element. More info.
   */
  category?: string | string[];
  /**
   * A string indicating the program used to generate the channel.
   */
  generator?: string;
  /**
   * A URL that points to the documentation for the format used in the RSS file. It's probably a pointer to this page. It's for people who might stumble across an RSS file on a Web server 25 years from now and wonder what it is.
   */
  docs?: string;
  /**
   * ttl stands for time to live. It's a number of minutes that indicates how long a channel can be cached before refreshing from the source.
   */
  ttl?: number;
  /**
   * Specifies a GIF, JPEG or PNG image that can be displayed with the channel.
   */
  image?: {
    /**
     * `url` is the URL of a GIF, JPEG or PNG image that represents the channel.
     */
    url: string;
    /**
     * `title` describes the image, it's used in the ALT attribute of the HTML `img` tag when the channel is rendered in HTML.
     */
    title: string;
    /**
     * `link` is the URL of the site, when the channel is rendered, the image is a link to the site. (Note, in practice the image `title` and `link` should have the same value as the channel's `title` and `link`.
     */
    link: string;
  };
  /**
   * `sy:updatePeriod` is used to set the interval or units used by the `sy:updateFrequency `elements and is explained in more detail in it's description. Possible values: 'hourly', 'daily', 'weekly', 'monthly', or 'yearly'.
   */
  'sy:updatePeriod'?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  /**
   * `sy:updateFrequency` is how often the feed is typically updated. This helps some automated systems that access RSS feeds to know when it should check back for updates. The `sy:updateFrequency `and the <sy:updatePeriod> are used together. For example if your RSS feed is typically updated every other week, you would set the `sy:updatePeriod` to 'weekly' and the `sy:updateFrequency` to '2'.
   */
  'sy:updateFrequency'?: number;
  /**
   * A channel may contain any number of **item**'s. An item may represent a "story" -- much like a story in a newspaper or magazine; if so its description is a synopsis of the story, and the link points to the full story. An item may also be complete in itself, if so, the description contains the text (entity-encoded HTML is allowed), and the link and title may be omitted. All elements of an item are optional, however at least one of title or description must be present.
   */
  item: rssItemType | rssItemType[];
}
