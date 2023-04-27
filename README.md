<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Example TODO list application meant only to refresh nest.js concepts.<br><br>
There are lots of missing or simplified pieces, including:
- in-memory storage instead of proper persistent layer
- hardcoded user identity / absence of Auth. Guard
- only sample test coverage
- no logging

The architecture of the application is probably both overingeneered and oversimplified.
<br>Overengineered:<br>
- too complex app structure
- too many architecture layers for the scope of the app

Oversimplified, given the chosen layers:
- missing mapper layer between transport layer <> service layer
- perhaps no use-case orchestration layer (something like handlers). Some project may have more transport layers and this architecture would duplicate the orchestration presented in controllers.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Radoslav Cink](https://www.linkedin.com/in/radoslavcink)

## License

MIT
