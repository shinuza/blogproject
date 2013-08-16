default: test

test:
	mocha -u qunit --reporter spec

.PHONY: test
