# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```sh
git clone {repository URL}
```

## Installing NPM modules

```sh
npm install
```

## Running application

```sh
npm start
```

## Building postgresql image and staring container

- Create file .env.local in root directory and put POSTGRES_USER and POSTGRES_PASSWORD variables in it, this username and password will be used to connect to the database
- Create database image with npm run image:db
- Run container npm run start:db

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/api-docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```sh
npm run test
```

To run only one of all test suites

```sh
npm run test -- <path to suite>
```

To run all test with authorization

```sh
npm run test:auth
```

To run only specific test suite with authorization

```sh
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```sh
npm run lint
```

```sh
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
