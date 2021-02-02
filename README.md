### [jsonify-that-feed](https://www.npmjs.com/package/jsonify-that-feed)

Parse `Atom`, `RSS`, `JSON` feeds to `JSON Feed 1.1`.

Or `OPML` to `JSON` and vice versa.

This module is specifically developed for [Ghost Reader](https://ghostreaderapp.com)

#### Install

```shell
# with npm: npm i jsonify-that-feed
yarn add jsonify-that-feed
```

#### Atom, RSS, JSON > JSON 1.1

```ts
import axios from 'axios';
import * as jsonify from 'jsonify-that-feed';

const { data } = await axios.get(url);
const feed = jsonify.toJson(data);
console.log(feed);
/*
  {
    "version": "https://jsonfeed.org/version/1.1",
    "title": "My Example Feed",
    "home_page_url": "https://example.org/",
    "feed_url"?: "https://example.org/feed.json",
    "items": [
      {
        "id": "1",
        "content_html"?: "<p>Hello, world!</p>",
        "url"?: "https://example.org/initial-post"
      }
    ]
  }
*/
```

#### OPML > JSON

```ts
const json = jsonify.opmlToJson(data);
console.log(json);
/**
  {
    version: 2,
    head: { title: 'Ghost Reader Subscriptions' },
    body: {
      outline: [
        {
          text: 'Example',
          title: 'Example',
          type: 'rss',
          xmlUrl: 'https://example.com/feed',
          htmlUrl: 'https://example.com',
        },
      ],
    },
  }
*/
```

#### JSON > OPML

```ts
const opml = jsonify.jsonToOpml(data);
console.log(opml);
/**
  <version>2</version>
  <head>
    <title>Ghost Reader Subscriptions</title>
  </head>
  <body>
    <outline>
      <text>Example</text>
      <title>Example</title>
      <type>rss</type>
      <xmlUrl>https://example.com/feed</xmlUrl>
      <htmlUrl>https://example.com</htmlUrl>
    </outline>
  </body>
*/
```
