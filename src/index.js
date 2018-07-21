import RssParser from 'rss-parser';
import Feed from 'feed';
import path from 'path';
import fs from 'fs';
const encoding = 'utf8';

const urlRegex = /^(?:[a-z]+:)?\/\//i;
const isUrl = url => (urlRegex.test(url));
const readData = filePath => fs.readFileSync(filePath, encoding);

export default class Feeds {
  constructor(options = {}) {
    this.options = {};
    this.options.path = options.path;
    this.options.format = options.format;
    this.options.metod = options.metod || 'data';
  }
  convert (options = this.options) {
    try {
    const {path, format, metod} = options;
    const feeds = isUrl(path) ? this.parse(path).fromUrl : this.parse(path).fromString;
    const sortedFeeds = mapping(feeds)[metod];
    return formating(sortedFeeds)[format];
    } catch (error) {
      throw new Error(error.code);
    }
  }
  async parse (data) {
    const parser = new RssParser();
    return {
      fromUrl: await parser.parseURL(data),
      fromString: parser.parseString(data)
    };
  };
  formating (data) {
    const feed = new Feed(data);
    return {
      toAtom: feed.atom1(),
      toRss: feed.rss2()
    };
  };
  mapping (data) {
    return {
      reverse: data.sort(),
      sort: data.sort(),
      limit: data.map(),
      data: data
    };
  };
}
