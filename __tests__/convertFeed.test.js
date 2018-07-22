import path from 'path';
import Feed from '../src';
import actualXML from './__fixtures__/actualXML'
const root = path.join(`${__dirname}`, '__fixtures__/' , 'actualXML.js');


test('rssDiff', async () => {
  await expect(new Feed().convert({path: 'https://ru.hexlet.io/lessons.rss', format: 'rss'})).resolves.toEqualXML(actualXML)
});

test('fileNotFound', () => {
  expect(() => gendiff(`${root}json/before.json`, `${root}json/afte.json`)).toThrow();
});
