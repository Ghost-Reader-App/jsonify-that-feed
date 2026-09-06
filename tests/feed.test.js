const assert = require('node:assert');
const { toJson, opmlToJson, jsonToOpml } = require('..');

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Example Feed</title>
    <link>https://example.com/</link>
    <description>Example RSS feed</description>
    <item>
      <title>First post</title>
      <link>https://example.com/first</link>
      <guid isPermaLink="true">https://example.com/first</guid>
      <pubDate>Mon, 04 Sep 2026 12:00:00 GMT</pubDate>
      <description>Hello &lt;b&gt;world&lt;/b&gt;</description>
      <category>tech</category>
      <category>news</category>
      <dc:creator>Jane Doe</dc:creator>
      <enclosure url="https://example.com/audio.mp3" length="10485760" type="audio/mpeg"/>
    </item>
    <item>
      <title>Second post</title>
      <link>https://example.com/second</link>
      <guid isPermaLink="true">https://example.com/second</guid>
      <media:content url="https://example.com/episode.mp3" fileSize="2048000" duration="1800"/>
    </item>
  </channel>
</rss>`;

const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Example Atom</title>
  <subtitle>Example Atom feed</subtitle>
  <entry>
    <title>Atom post</title>
    <id>urn:uuid:5d6d5e6a</id>
    <link rel="alternate" type="text/html" href="https://example.com/atom-post"/>
    <published>2026-09-01T10:00:00Z</published>
    <updated>2026-09-02T10:00:00Z</updated>
    <summary>A summary</summary>
    <content type="html">&lt;p&gt;Atom content&lt;/p&gt;</content>
    <author><name>John Roe</name></author>
    <category term="misc"/>
  </entry>
</feed>`;

const jsonFeedV1 = {
  version: 'https://jsonfeed.org/version/1',
  title: 'Legacy Feed',
  items: [{ id: '1', title: 'Item', author: { name: 'Legacy Author' } }],
};

const jsonFeedV11 = {
  version: 'https://jsonfeed.org/version/1.1',
  title: 'Modern Feed',
  items: [{ id: '1', title: 'Item' }],
};

const opml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head><title>Subscriptions</title></head>
  <body>
    <outline text="Group" title="Group">
      <outline type="rss" text="Example &amp; Co" title="Example &amp; Co" xmlUrl="https://example.com/feed" htmlUrl="https://example.com"/>
    </outline>
    <outline type="rss" text="Solo" title="Solo" xmlUrl="https://solo.example/feed" htmlUrl="https://solo.example"/>
  </body>
</opml>`;

describe('jsonify', () => {
  it('converts RSS 2.0 to JSON Feed 1.1', () => {
    const feed = toJson(rssFeed);
    assert.equal(feed.version, 'https://jsonfeed.org/version/1.1');
    assert.equal(feed.title, 'Example Feed');
    assert.equal(feed.items.length, 2);

    const [first, second] = feed.items;
    assert.equal(first.id, 'https://example.com/first');
    assert.equal(first.url, 'https://example.com/first');
    // entity-decoded full text, the old parse order dropped everything after the first tag
    assert.equal(first.summary, 'Hello <b>world</b>');
    assert.deepStrictEqual(first.tags, ['tech', 'news']);
    assert.deepStrictEqual(first.authors, [{ name: 'Jane Doe' }]);
    assert.equal(first.attachments[0].url, 'https://example.com/audio.mp3');
    assert.equal(first.attachments[0].mime_type, 'audio/mpeg');
    assert.equal(first.attachments[0].size_in_bytes, 10485760);

    // media:content without a type attribute falls back to the attachment url
    assert.equal(second.attachments[0].mime_type, 'audio/mpeg');
    assert.equal(second.attachments[0].duration_in_seconds, 1800);
  });

  it('converts Atom to JSON Feed 1.1', () => {
    const feed = toJson(atomFeed);
    assert.equal(feed.version, 'https://jsonfeed.org/version/1.1');
    assert.equal(feed.title, 'Example Atom');
    assert.equal(feed.description, 'Example Atom feed');
    const [item] = feed.items;
    assert.equal(item.id, 'urn:uuid:5d6d5e6a');
    assert.equal(item.url, 'https://example.com/atom-post');
    // entity-decoded html content, v1.2.2 produced the string "undefined" here
    assert.equal(item.content_html, '<p>Atom content</p>');
    assert.equal(item.date_published, '2026-09-01T10:00:00Z');
    assert.equal(item.date_modified, '2026-09-02T10:00:00Z');
    assert.equal(item.summary, 'A summary');
    assert.deepStrictEqual(item.tags, ['misc']);
    assert.deepStrictEqual(item.authors, [{ name: 'John Roe' }]);
  });

  it('upgrades JSON Feed 1.0 to 1.1', () => {
    const feed = toJson(jsonFeedV1);
    assert.equal(feed.version, 'https://jsonfeed.org/version/1.1');
    assert.deepStrictEqual(feed.items[0].authors, [{ name: 'Legacy Author' }]);
    assert.equal(feed.items[0].author, undefined);
  });

  it('passes JSON Feed 1.1 through', () => {
    const feed = toJson(jsonFeedV11);
    assert.deepStrictEqual(feed, jsonFeedV11);
  });

  it('rejects feeds that are neither JSON nor XML', () => {
    assert.throws(() => toJson('this is not a feed'), /not expected/);
    assert.throws(() => toJson({ version: 'https://jsonfeed.org/version/9' }), /Feed validation failure/);
  });

  it('converts OPML to JSON', () => {
    const json = opmlToJson(opml);
    assert.equal(json.version, 2);
    assert.equal(json.head.title, 'Subscriptions');
    assert.equal(json.body.outline.length, 2);
    const [group, solo] = json.body.outline;
    assert.equal(solo.text, 'Solo');
    assert.equal(solo.xmlUrl, 'https://solo.example/feed');
    assert.equal(group.text, 'Group');
    assert.equal(group.outline.text, 'Example & Co');
    assert.equal(group.outline.xmlUrl, 'https://example.com/feed');
  });

  it('round-trips OPML through JSON and back to XML', () => {
    const json = opmlToJson(opml);
    const xml = jsonToOpml(json);
    // fast-xml-parser builds outline properties as child elements, same as v1.2.2 did
    assert(xml.includes('<title>Subscriptions</title>'));
    assert(xml.includes('<xmlUrl>https://example.com/feed</xmlUrl>'));
    assert(xml.includes('<text>Example &amp; Co</text>'));

    const again = opmlToJson(xml);
    assert.deepStrictEqual(again, json);
  });
});
