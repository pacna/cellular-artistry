## ----------------------------------------------------------------------
## The purpose of this Makefile is to simplify common development tasks.
## ----------------------------------------------------------------------
##
## Usage:
##   - make local        : Run the app locally
##   - make build        : Build the application
##   - make deploy       : Build and deploy to GitHub Pages
##   - make test         : Run tests
##   - make help         : Show available commands and descriptions
##

.PHONY:local
local:
	npm run dev

.PHONY:build
build:
	npm run build

.PHONY:deploy
deploy:
	make build
	bash deploy.sh

.PHONY:test
test:
	npm test

.PHONY:help
help:
	@sed -ne '/@sed/!s/##//p' $(MAKEFILE_LIST)