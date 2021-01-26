### [jsonify-that-feed](https://www.npmjs.com/package/jsonify-that-feed)

Parse `Atom`, `RSS` and `JSON` feeds to `JSON Feed 1.1`.

This module is specifically developed for [Ghost Reader](https://ghostreaderapp.com)

### Install

```shell
# with npm: npm i jsonify-that-feed
yarn add jsonify-that-feed
```

### Usage Example

```ts
import axios from 'axios';
import jsonify from 'jsonify-that-feed';

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
        "id": "2",
        "content_text"?: "This is a second item.",
        "url"?: "https://example.org/second-item"
      },
      {
        "id": "1",
        "content_html"?: "<p>Hello, world!</p>",
        "url"?: "https://example.org/initial-post"
      }
    ]
  }
*/
```
