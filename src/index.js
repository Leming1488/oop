import RssParser from 'rss-parser';
import Feed from 'feed';
import path from 'path';
import fs from 'fs';
const encoding = 'utf8';

const urlRegex = /^(?:[a-z]+:)?\/\//i;
const isUrl = url => (urlRegex.test(url));
const readData = filePath => fs.readFileSync(filePath, encoding);

class Parser {
  constructor() {
    this.parser = new RssParser();
  }
  url (data) {
    return  this.parser.parseURL(data);
  }
  string (data) {
    return this.parser.parseString(data);
  }
}
class Render {
  constructor(options) {
    this.node = new Feed(options);
  }
  atom () {
    return this.node.rss2();
  }
  rss () {
    return this.node.rss2();
  }
  addItem (posts) {
    posts.forEach(post => this.node.addItem(post));
  }
}

export default class Feeds {
  async convert (options = {}) {
    try {
      const {path, format, metod = 'default'} = options;
      const feeds = await this.parsing(path);
      return this.rendering(feeds, this.mapping(metod))[format]();
    } catch (error) {
      throw new Error(error.code);
    }
  }
  parsing (data) {
    const parser = new Parser();
    if (isUrl(data)) {
      return  parser['url'](data);
    };
    return parser['string'](data);

  }
  rendering (data, fn) {
    const render = new Render(data);
    const mappingItems = fn(data.items);
    render.addItem(mappingItems);
    return render;
  };
  mapping (options) {
    const map = {
      reverse: data => data.reverse(),
      sort: data => data.sort(),
      limit: data => data.map(),
      default: data => data
    };
    return (data) => map[options](data)
  };
}
