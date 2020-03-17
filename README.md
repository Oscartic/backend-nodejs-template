# Backend Node JS Template


This template is the father of backend projects in Abstract.

# What's inside this template?

This template contains the following technologies:

- [Chai](https://www.chaijs.com/) as assertion library
- [Mocha](https://mochajs.org/) as test framework
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) for in-code API documentation.
- Github actions to test, lint and deploy.
- Mongo and mongoose as database.
- Express as backend framework.

# Usage

## Installation

Just clone the repository as a template. [Github documentation](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)


##  Find all and replace 

To properly set the name of the application and the associated github actions, you have to *find and replace* the following terms:

- application-name -> the name of the application.

- repository-name -> the exact name of the repo.

# application-name backend

## Develop
[![Actions Status](https://github.com/abstract-cl/repository-name/workflows/Deploy/badge.svg)](https://github.com/abstract-cl/toboso-api)
[![Actions Status](https://github.com/abstract-cl/repository-name/workflows/Test/badge.svg)](https://github.com/abstract-cl/toboso-api)
[![Actions Status](https://github.com/abstract-cl/repository-name/workflows/Lint/badge.svg)](https://github.com/abstract-cl/toboso-api)
[![Actions Status](https://github.com/abstract-cl/repository-name/workflows/Audit/badge.svg)](https://github.com/abstract-cl/toboso-api)

## Installation

**Important:**
You need to have the file ~/.npmrc with you github access token. Here you can find the [documentation](https://help.github.com/es/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#)
The steps to follow are: 

  1) Obtain a Github access token
  2) Add it to the npm package registry in the ~/.npmrc file


With [npm](https://npmjs.org/) installed, run

    $ npm install
    
You also need to install [MongoDb 4.2 community edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).

## Running Locally

    $ npm run local

## Testing

    $ npm test

## Linting
  
  This proyect uses the Airbnb eslint standard for Javascript (https://github.com/airbnb/javascript):
  
    $ npm run lint

## Audit 
  
  To audit this proyect's npm dependencies run:
    
    $ npm audit --registry=https://registry.npmjs.org
  
## Pull Requests

  Pull requests will run 3 checks
    * Linter
    * Tests
    * Audit
  
  And require an approval from someone else.
  
  If all checks pass then the code will be able to merge.
