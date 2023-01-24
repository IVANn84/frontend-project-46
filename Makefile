install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest

lint:
	npx eslint .	

fix:
		npx eslint . --fix

publish:
	npm publish --dry-run

.PHONY: test
