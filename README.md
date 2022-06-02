# Social Media Application

<p align="center">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B??style=plastic&logo=mongodb&logoColor=white">
    <img src="https://img.shields.io/badge/Express.js-404D59=?style=plastic">
    <img src="https://img.shields.io/badge/React-20232A?style=plastic&logo=react&logoColor=61DAFB">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=plastic&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=plastic&logo=javascript&logoColor=F7DF1E">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=plastic&logo=typescript&logoColor=white">
</p>

## Overview

social Media application using react-native typescript on the frontend , mongoDB,express,node.js on the backend

## Requirements

Have npm & node.js & installed.

## Getting Started

```bash
# Clone this repository
$ git clone https://github.com/kartowka/webapp.git

# Go into the repository
$ cd webapp

# Install dependencies
$ npm install

# Run linter
$ npm run lint

# Compile the code using typescript compiler
$ npm run build

# Run prettier
$ npm run format

# Run the app
$ npm run dev

# Run Auth,Post API tests
$ npm run test:API

#run socket.io tests
$ npm run test:socket
```

## Deployment

Additional notes on how to deploy this on a live or release system. Explaining the most important branches, what pipelines they trigger and how to update the database (if anything special).

## Additional Documentation and Acknowledgments

```bash
# if you want your code compiled to esm like es2022 module
# run this command it will create,compile,lint,format
# fix imports for extension like .js in the end
# outDir=out folder
$ outDir=esm npm run build:esm
```

```bash
# to run this you should install docker on your machine
# run the docker containers {node.js,mongo} on seperate containers
# with communication between them, also log presented.
$ docker-compose up
# run the docker containers {node.js,mongo} on seperate containers
# with communication on without log.
$ docker-compose up -d
# stop the service
$ docker-compose down

```

- Project folder on server:
- Confluence link:
- Asana board:
- etc...

## License

MIT

## Authors

**_Sharon Yaroshetsky_**

**_Anthony Eitan Fleysher_**
