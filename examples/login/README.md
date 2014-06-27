# Passport-GitHub

This is a simple example on how to use passport-github using [Expressjs (3.x)](expressjs.com).

## Create an application on Github

First, you’ll need to [register your application](https://github.com/settings/applications/new) on Github to get a **Client ID** and **Client Secret** tokens.

Then simply put those values in the `app.js` file.

```js
var GITHUB_CLIENT_ID     = "--insert-github-client-id-here--"
var GITHUB_CLIENT_SECRET = "--insert-github-client-secret-here--";
```

## Install

    $ npm install

## Try it!

Go to `127.0.0.1:3000/login` and enjoy!