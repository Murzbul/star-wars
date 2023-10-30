# Welcome to Star Wars Experience!

[![CircleCI](https://circleci.com/gh/DigiChanges/node-experience/tree/master.svg?style=svg)](https://circleci.com/gh/DigiChanges/node-experience/tree/master)
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
2Install dependencies. `pnpm install`.
2. Copy `.env.dev` file to `.env`. (**.env.dev** it's an environment example file)
3. Then execute `STAGE=dev docker-compose up --build` to up all containers or `make dev`

Each module is divided by business domain:

- File
- Item
- Notification

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

> **Tip** I know it may sound repetitive, but it is not a framework. NExp is a set of tools or libraries working together through a common structure. All structural code within this project is not fixed and can be changed freely.

## Advantages

The advantages of using this boilerplate is to save time thinking about certain basic structures common to any project to make an API without having to get everything from scratch. 

As it is only a boilerplate, you have the freedom to structure the code whatever you want.

Common structures found within this project are: 

- Authentication and authorization with [Keycloak](https://www.keycloak.org).
- Filesystem with [MinIO](https://min.io), 100% S3 compatible.
- Basic push Notification and Email with nodemailer.
- MikroORM and Mongoose Integration.
- Koa integration.
- Business logic independent of the HTTP and persistence libraries.

## License

**NExp** is [MIT licensed](LICENSE).
