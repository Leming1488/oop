install: install-deps
run:
	DEBUG=page-loader npm run babel-node  -- 'src/bin/convert-feed.js' 'rss' 'https://ru.hexlet.io/lessons.rss'

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	DEBUG=convert-feed npm test -- --coverage

test-watch:
	DEBUG=convert-feed npm test -- --watch

lint:
	npm run eslint -- src __tests__

link:
	make build
	npm link

publish:
	npm publish

.PHONY: test
