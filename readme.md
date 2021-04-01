# GPI front error logger

> Simple api for error logging for www.goplaceit.com

Any time ErrorBoundary catches an exception, a POST request is made. Point it to this API to log them.

## Getting started for production

- run `npm install`
- edit `db/index.js` and `./database.json` to add your database connection details (it's set to use postgres). The first file is for database connection within application and the second is for running migrations.
- start your postgresql service if not already running
- run `db-migrate up`
- start server with `npm start` (you should add this as a service on your server)

## Getting started for development

- Run all steps above but instead of starting server with `npm start`, use `npm run dev`

## Routes

> `GET /errors`

Returns JSON object with last 50 exceptions

> `POST /errors`

Creates new error log. Request shape:

```
  {
    url:string, // url that originated the exception
    type:string, // exception type
    message:string, // exception message
    browser:string // user agent string
  }
```

## Notice:

As heroku free plan is very restricted, the database will be erased after reaching 5000 errors :)

## TO DO:

- Add sorting and pagination to `GET /errors`
