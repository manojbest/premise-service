
install:
	npm install

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter spec --timeout 3000 test/unit

test-coverage:
	@NODE_ENV=test ./node_modules/.bin/istanbul cover --dir ./reports ./node_modules/.bin/_mocha -- --recursive --reporter spec test/unit