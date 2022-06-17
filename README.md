Indian Ocean Digital Collections 
========

Requirement
- Docker

Nice to have:

- Docker Compose

Do not run `npm install`. The file package.json includes a list of scripts to build and deploy.

To build, run any of the script with build-*.

Example:

```
$ npm run build-local
```

If `npm` is not available, see `.scripts` in package.json for commands,

```
$ rm -rf ./build && docker build -o build . --build-arg APP_ENV=local
```

To see the site locally

```
$ docker-compose up -d
```

#### Test URL

Open the URL http://localhost
