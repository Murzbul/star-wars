# Welcome to Star Wars Experience!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/DigiChanges/node-experience/blob/master/LICENSE)

<div style="text-align:center">
    <img width="125" src="nexp.svg" alt="logo NExp">
</div>

## Basic Description
Hello! This is a Star Wars project with [Node Experience](https://github.com/DigiChanges/node-experience) and [swapi](https://swapi.dev), which makes use of a Clean Architecture + DDD, with [**TypeScript**](https://www.typescriptlang.org/) that combined allow a perfect cohesion thus achieving a clean and at the same time very powerful implementation.

## Base project

https://github.com/DigiChanges/node-experience

## Docs

### Boilerplate Documentation

[Boilerplate Documentation](https://digichanges.github.io/nexp-docs)

## Quick Start

We can run the project directly with docker compose and then bash where the basic commands to feed the database are located.

1. git clone https://github.com/Murzbul/star-wars
2. Install dependencies. `pnpm install`.
2. Copy `.env.dev` file to `.env`. (**.env.dev** it's an environment example file)
3. Then execute `STAGE=dev docker-compose up --build` to up all containers or `make dev`

### You can run tests
1. As outlined in the quick start guide, you must first install the dependencies.
2. Next, execute pnpm build to transpile TypeScript (TS) code to JavaScript (JS).
3. To run the tests, use the command pnpm test.

NOTE: No additional dependencies or setups are required to run the tests.
NOTE2: Step two is crucial for running the tests since they operate on the compiled code. 
This approach ensures swift coordination between the transpilation of TypeScript and the execution of vanilla JavaScript.
Each module is divided by business domain:

- People
- Planet
- Films
- Starship

There are also two particular cases:

- Config
- Shared

The directory structures for business domains are as follows: 

**Folder structure of a domain (business logic)**

```sh 
├── Domain
│   ├── Entities
│   ├── Exceptions
│   └── Services
│   └── UseCases
├── Infrastructure
│   ├── Repositories
│   ├── Schema
│   └── Seeds
├── Presentation
│   ├── Commands
│   ├── Controllers
│   ├── Criterias
│   ├── Exceptions
│   ├── Handlers
│   ├── Middlewares
│   ├── Requests
│   └── Transformers
├── Tests
│   ├── Fixtures
 ```

---

## API Documentation

https://documenter.getpostman.com/view/2610856/2s9YXe6PVn

## License

**NExp** is [MIT licensed](LICENSE).
