## ----------------------------------------------------------------------
## The purpose of this Makefile is to simplify common development tasks.
## ----------------------------------------------------------------------
##
## Usage:
##   - To run the application locally, use: 'make local'
##   - To build the application, use: 'make build'
##   - To deploy to GH Page, use: 'make deploy'
##   - To run tests, use: 'make test'
##   - To display this help message, use: 'make help'
##

.PHONY:local
local: ##  Run the application locally
##
	npm run dev

.PHONY:build
build: ##  Build the application
##
	npm run build

.PHONY:deploy
deploy: ## Build and deploy to GH Page
##
	make build
	bash deploy.sh

.PHONY:test
test: ##   Run tests
##
	npm test

.PHONY:help
help: ##   Show the help message with target descriptions
##
	@sed -ne '/@sed/!s/##//p' $(MAKEFILE_LIST)