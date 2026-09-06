/**
 * An `outline` is an XML element containing at least one required attribute, text, and zero or more additional attributes.
 * An `outline` may contain zero or more `outline` sub-elements.
 * No attribute may be repeated within the same `outline` element.
 * */
export interface opmlItemType {
  /**
   * A missing text attribute in any outline element is an error.
   * Text attributes may contain encoded HTML markup.
   */
  text: string;
  /**
   * should be same as text
   */
  title: string;
  /**
   * rss or json feed url
   */
  xmlUrl?: string;
  /**
   * html url of the feed
   */
  htmlUrl?: string;
  /**
   * type of the feed (rss or json)
   */
  type?: string;
  /**
   * Zero or more nested outline sub-elements
   */
  outline?: opmlItemType | opmlItemType[];
  /**
   * language of the feed
   */
  language?: string;
  /**
   * created is the date-time that the outline node was created.
   */
  created?: Date;
  /**
   * directory where this feed belongs to
   */
  folder?: string;
}

/**
 * `opml` is an XML element, with a single required attribute, version; a `head` element and a `body` element, both of which are required.
 */
export interface opmlType {
  version: number;
  head: {
    /**
     * `title` is the title of the document.
     */
    title: string;
    /**
     * `dateCreated` is a date-time, indicating when the document was created.
     */
    dateCreated?: string;
    /**
     * `dateModified` is a date-time, indicating when the document was last modified.
     */
    dateModified?: string;
    /**
     * `ownerName> is a string, the owner of the document.
     */
    ownerName?: string;
    /**
     * `ownerEmail` is a string, the owner of the document.
     */
    ownerEmail?: string;
  };
  /**
   * Contains the content of the outline. Must have at least one outline element.
   */
  body: {
    /**
     * An outline is a tree, where each node contains a set of named attributes with string values.
     */
    outline: opmlItemType[];
  };
}
