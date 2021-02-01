/**
 * authors (optional, array of objects) specifies one or more feed authors. The author object has several members. These are all optional — but if you provide an author object, then at least one is required:
 */
export interface jsonFeedAuthorsType {
  /**
   * name (optional, string) is the author’s name.
   */
  name: string;
  /**
   * url (optional, string) is the URL of a site owned by the author. It could be a blog, micro-blog, Twitter account, and so on. Ideally the linked-to page provides a way to contact the author, but that’s not required. The URL could be a mailto: link, though we suspect that will be rare.
   */
  url?: string;
  // avatar (optional, string) is the URL for an image for the author. As with icon, it should be square and relatively large — such as 512 x 512 — and should use transparency where appropriate, since it may be rendered on a non-white background.
  avatar?: string;
}

/**
 * attachments (optional, array) lists related resources. Podcasts, for instance, would include an attachment that’s an audio or video file. Each attachment has several members:
 */
export interface jsonFeedAttachmentsType {
  /**
   * title (optional, string) is a name for the attachment. Important: if there are multiple attachments, and two or more have the exact same title (when title is present), then they are considered as alternate representations of the same thing. In this way a podcaster, for instance, might provide an audio recording in different formats.
   */
  title?: string;
  /**
   * url (required, string) specifies the location of the attachment.
   */
  url: string;
  /**
   * mime_type (required, string) specifies the type of the attachment, such as “audio/mpeg.”
   */
  mime_type: string;
  /**
   * size_in_bytes (optional, number) specifies how large the file is.
   */
  size_in_bytes?: number;
  /**
   * duration_in_seconds (optional, number) specifies how long it takes to listen to or watch, when played at normal speed.
   */
  duration_in_seconds?: number;
}

export interface jsonFeedItemType {
  /**
   * title (optional, string) is plain text. Microblog items in particular may omit titles.
   */
  title: string;
  /**
   * date_published (optional, string) specifies the date in RFC 3339 format. (Example: 2010-02-07T14:04:00-05:00.)
   */
  date_published?: Date;
  /**
   * date_modified (optional, string) specifies the modification date in RFC 3339 format.
   */
  date_modified?: Date;
  /**
   * id (required, string) is unique for that item for that feed over time. If an item is ever updated, the id should be unchanged. New items should never use a previously-used id. If an id is presented as a number or other type, a JSON Feed reader must coerce it to a string. Ideally, the id is the full URL of the resource described by the item, since URLs make great unique identifiers.
   */
  id: string;
  /**
   * url (optional, string) is the URL of the resource described by the item. It’s the permalink. This may be the same as the id — but should be present regardless.
   */
  url?: string;
  /**
   * external_url (very optional, string) is the URL of a page elsewhere. This is especially useful for linkblogs. If url links to where you’re talking about a thing, then external_url links to the thing you’re talking about.
   */
  external_url?: string;
  /**
   * JSON Feed version 1 specified a singular author field instead of the authors array used in version 1.1. New feeds should use authors, even if only 1 author is needed. Existing feeds can include both author and authors for compatibility with existing feed readers. Feed readers should always prefer authors if present.
   * Deprecated items remain valid forever, but you should move to the new fields when you can. A feed using fields from JSON Feed 1.0 is still a valid feed for version 1.1 and future versions of JSON Feed.
   */
  author?: jsonFeedAuthorsType;
  /**
   *   // authors (optional, array of objects) specifies one or more feed authors. The author object has several members. These are all optional — but if you provide an author object, then at least one is required:
   */
  authors?: jsonFeedAuthorsType[];
  /**
   * image (optional, string) is the URL of the main image for the item. This image may also appear in the content_html — if so, it’s a hint to the feed reader that this is the main, featured image. Feed readers may use the image as a preview (probably resized as a thumbnail and placed in a timeline).
   */
  image?: string;
  /**
   * banner_image (optional, string) is the URL of an image to use as a banner. Some blogging systems (such as Medium) display a different banner image chosen to go with each post, but that image wouldn’t otherwise appear in the content_html. A feed reader with a detail view may choose to show this banner image at the top of the detail view, possibly with the title overlaid.
   */
  banner_image?: string;
  /**
   * tags (optional, array of strings) can have any plain text values you want. Tags tend to be just one word, but they may be anything. Note: they are not the equivalent of Twitter hashtags. Some blogging systems and other feed formats call these categories.
   */
  tags?: string[];
  /**
   * attachments (optional, array) lists related resources. Podcasts, for instance, would include an attachment that’s an audio or video file.
   */
  attachments?: jsonFeedAttachmentsType[];
  /**
   * summary (optional, string) is a plain text sentence or two describing the item. This might be presented in a timeline, for instance, where a detail view would display all of content_html or content_text.
   */
  summary?: string;
  /**
   * content_html and content_text are each optional strings — but one or both must be present. This is the HTML or plain text of the item. Important: the only place HTML is allowed in this format is in content_html. A Twitter-like service might use content_text, while a blog might use content_html. Use whichever makes sense for your resource. (It doesn’t even have to be the same for each item in a feed.)
   */
  content_text?: string;
  /**
   * content_html and content_text are each optional strings — but one or both must be present. This is the HTML or plain text of the item. Important: the only place HTML is allowed in this format is in content_html. A Twitter-like service might use content_text, while a blog might use content_html. Use whichever makes sense for your resource. (It doesn’t even have to be the same for each item in a feed.)
   */
  content_html?: string;
}

export interface jsonFeedType {
  /**
   * version (required, string) is the URL of the version of the format the feed uses. This should appear at the very top, though we recognize that not all JSON generators allow for ordering.
   */
  version: string;
  /**
   * title (required, string) is the name of the feed, which will often correspond to the name of the website (blog, for instance), though not necessarily.
   */
  title: string;
  /**
   * home_page_url (optional but strongly recommended, string) is the URL of the resource that the feed describes. This resource may or may not actually be a “home” page, but it should be an HTML page. If a feed is published on the public web, this should be considered as required. But it may not make sense in the case of a file created on a desktop computer, when that file is not shared or is shared only privately.
   */
  home_page_url?: string;
  /**
   * feed_url (optional but strongly recommended, string) is the URL of the feed, and serves as the unique identifier for the feed. As with home_page_url, this should be considered required for feeds on the public web.
   */
  feed_url?: string;
  /**
   * description (optional, string) provides more detail, beyond the title, on what the feed is about. A feed reader may display this text.
   */
  description?: string;
  /**
   * icon (optional, string) is the URL of an image for the feed suitable to be used in a timeline, much the way an avatar might be used. It should be square and relatively large — such as 512 x 512 — so that it can be scaled-down and so that it can look good on retina displays. It should use transparency where appropriate, since it may be rendered on a non-white background.
   */
  icon?: string;
  /**
   * JSON Feed version 1 specified a singular author field instead of the authors array used in version 1.1. New feeds should use authors, even if only 1 author is needed. Existing feeds can include both author and authors for compatibility with existing feed readers. Feed readers should always prefer authors if present.
   * Deprecated items remain valid forever, but you should move to the new fields when you can. A feed using fields from JSON Feed 1.0 is still a valid feed for version 1.1 and future versions of JSON Feed.
   */
  author?: jsonFeedAuthorsType;
  /**
   *   // authors (optional, array of objects) specifies one or more feed authors. The author object has several members. These are all optional — but if you provide an author object, then at least one is required:
   */
  authors?: jsonFeedAuthorsType[];
  /**
   * favicon (optional, string) is the URL of an image for the feed suitable to be used in a source list. It should be square and relatively small, but not smaller than 64 x 64 (so that it can look good on retina displays). As with icon, this image should use transparency where appropriate, since it may be rendered on a non-white background.
   */
  favicon?: string;
  /**
   * items is an array, and is required.
   */
  items: jsonFeedItemType[];
  /**
   * `updatePeriod` is used to set the interval or units used by the `updateFrequency `elements and is explained in more detail in it's description. Possible values: 'hourly', 'daily', 'weekly', 'monthly', or 'yearly'.
   */
  updatePeriod?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  /**
   * `updateFrequency` is how often the feed is typically updated. This helps some automated systems that access RSS feeds to know when it should check back for updates. The `updateFrequency` and the `updatePeriod` are used together. For example if your RSS feed is typically updated every other week, you would set the `updatePeriod` to 'weekly' and the `updateFrequency` to '2'.
   */
  updateFrequency?: number;
}
