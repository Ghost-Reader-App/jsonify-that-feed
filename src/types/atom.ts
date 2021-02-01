interface authorType {
  name: string;
  email?: string;
  uri?: string;
}

/**
 * `link` is patterned after html's link element. It has one required attribute, href, and five optional attributes: rel, type, hreflang, title, and length.
 */
interface linkType {
  /**
   * href is the URI of the referenced resource (typically a Web page)
   */
  href: string;
  /**
   * rel contains a single link relationship type. It can be a full URI (see extensibility), or one of the following predefined values (default=alternate):
   * alternate: an alternate representation of the entry or feed, for example a permalink to the html version of the entry, or the front page of the weblog.
   * enclosure: a related resource which is potentially large in size and might require special handling, for example an audio or video recording.
   * related: an document related to the entry or feed.
   * self: the feed itself.
   * via: the source of the information provided in the entry.
   */
  rel?: 'alternate' | 'enclosure' | 'related' | 'self' | 'via';
  /**
   * type indicates the media type of the resource.
   */
  type?: string;
  /**
   * hreflang indicates the language of the referenced resource.
   */
  hreflang?: string;
  /**
   * title human readable information about the link, typically for display purposes.
   */
  title?: string;
  /**
   * length the length of the resource, in bytes.
   */
  length?: number;
}

/**
 * Specifies a category that the feed belongs to. A feed may have multiple category elements.
 */
interface category {
  /**
   * identifies the category
   */
  term: string;
  /**
   * identifies the categorization scheme via a URI.
   */
  scheme?: string;
  /**
   * provides a human-readable label for display
   */
  label?: string;
}

/**
 * An example of an entry would be a single post on a weblog.
 */
export interface atomItemType {
  /**
   * 	Identifies the entry using a universally unique and permanent URI.
   */
  id: string;
  /**
   * Contains a human readable title for the entry. This value should not be blank.
   */
  title: string;
  /**
   * Indicates the last time the entry was modified in a significant way. This value need not change after a typo is fixed, only after a substantial modification. Generally, different entries in a feed will have different updated timestamps.
   */
  updated: Date;
  /**
   * Contains the time of the initial creation or first availability of the entry.
   */
  published?: Date;
  /**
   * 	Identifies a related Web page. The type of relation is defined by the rel attribute. An entry is limited to one alternate per type and hreflang. An entry must contain an alternate link if there is no content element.
   */
  link?: linkType | linkType[];
  /**
   * Specifies a category that the entry belongs to. A entry may have multiple category elements.
   */
  category?: category | category[];
  /**
   * Names one author of the entry. An entry may have multiple authors. An entry must contain at least one author element unless there is an author element in the enclosing feed, or there is an author element in the enclosed source element.
   */
  author?: string;
  /**
   * 	Names one contributor to the entry. An entry may have multiple contributor elements.
   */
  contributor?: string | string[];
  /**
   * Conveys a short summary, abstract, or excerpt of the entry. Summary should be provided if there either is no content provided for the entry, or that content is not inline (i.e., contains a src attribute), or if the content is encoded in base64.
   */
  summary?: string;
  /**
   * Contains or links to the complete content of the entry. Content must be provided if there is no alternate link, and should be provided if there is no summary.
   */
  content?: string;
  /**
   * Conveys information about rights, e.g. copyrights, held in and over the entry.
   */
  rights?: string;
  /**
   * Contains metadata from the source feed if this entry is a copy.
   */
  source: {
    id: string;
    title: string;
    updated: Date;
  };
  /**
   * Describes a image object that is attached to the item.
   */
  'media:thumbnail'?: {
    url: string;
    height: number;
    width: number;
  };
}

export interface atomFeedType {
  /**
   * Identifies the feed using a universally unique and permanent URI. If you have a long-term, renewable lease on your Internet domain name, then you can feel free to use your website's address.
   */
  id: string;
  /**
   * Contains a human readable title for the feed. Often the same as the title of the associated website. This value should not be blank.
   */
  title: string;
  /**
   * Contains a human-readable description or subtitle for the feed.
   */
  subtitle?: string;
  /**
   * Indicates the last time the feed was modified in a significant way.
   */
  updated: Date;
  /**
   * Identifies a related Web page. The type of relation is defined by the rel attribute. A feed is limited to one alternate per type and hreflang. A feed should contain a link back to the feed itself.
   */
  link?: linkType | linkType[];
  /**
   * Names one author of the feed. A feed may have multiple author elements. A feed must contain at least one author element unless all of the entry elements contain at least one author element. More info here.
   */
  author?: authorType | authorType[];
  /**
   * Specifies a category that the feed belongs to. A feed may have multiple category elements.
   */
  category?: string | string[];
  /**
   * Names one contributor to the feed. An feed may have multiple contributor elements.
   */
  contributor?: string | string[];
  /**
   * Identifies the software used to generate the feed, for debugging and other purposes. Both the uri and version attributes are optional.
   */
  generator?: string;
  /**
   * Identifies a small image which provides iconic visual identification for the feed. Icons should be square.
   */
  icon?: string;
  /**
   * Identifies a larger image which provides visual identification for the feed. Images should be twice as wide as they are tall.
   */
  logo?: string;
  /**
   * Conveys information about rights, e.g. copyrights, held in and over the feed.
   */
  rights?: string;
  /**
   * An example of an entry would be a single post on a weblog.
   */
  entry: atomItemType | atomItemType[];
}
