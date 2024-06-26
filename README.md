# Music Service

The project consist of three parts: this repository that serves as main api, [auth service](https://github.com/arkdich/nodejs-auth-service) and [nginx gateway](https://github.com/arkdich/music-service-gateway)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/package-manager) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Downloading

```sh
git clone git@github.com:arkdich/nodejs-music-service.git
```

## Installing NPM modules

```sh
npm install
```

## Creating config file

Create file `.env.local` in root directory and put environment variables in it, they wiil be used to configure application

- POSTGRES_USER - username to access database
- POSTGRES_PASSWORD
- CRYPT_SALT=10 - salt used for password hashing
- JWT_SECRET_KEY - secret to generate access token
- JWT_SECRET_REFRESH_KEY - secret to generate refresh token
- JWT_SECRET_RESET_KEY= - secret to generate password reset token
- JWT_REFRESH_TOKEN_EXPIRES_IN - max-age value for refresh token stored in http-only cookie in a format of ms (i.e. '30d')
- SMTP_USER - account to send email from (IMAP must be configured)
- SMTP_PASSWORD

## Running application with database

```sh
npm run start:compose
```

## Running database in container and application in dev mode

```sh
npm run start:compose -- database
```

```sh
npm run start:dev
```

## Swagger docs

After starting the app on port (4000 as default) you can open in your browser Swagger documentation by typing http://localhost:4000/api-docs/. For more information about Swagger/OpenAPI please visit https://swagger.io/

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
