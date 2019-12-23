# MirrorGate Feedback Collector

![MirrorGate](./media/images/logo-ae.png)

This Node application connects to a MirrorGate endpoint to get the id of the applications which comments and ratings must be recovered from Google Play and App Store.

## Configuring

Check [config.js](./src/config/config.js) file to check for configuration options.

The Feedback Collector works with the assumption that both the endpoint to recover the applications that need to be searched in the market and the endpoint to send the reviews are configured as environment variables.

```text
  MIRRORGATE_APPLIST_URL
  MIRRORGATE_REVIEWS_URL
```

If not, default endpoints defined in properties will be used.

```text
  mirrorgate_reviews_url = 'http://localhost:8080/mirrorgate/api/reviews',
  mirrorgate_applist_url = 'http://localhost:8080/mirrorgate/api/applications'
```

## Language

By default comments are collected in english and spanish. If you want to change the lang list set the `MIRRORGATE_LANG_LIST` environment variable to
a comma separated list of two letter lang references (i.e. `fr,es,en`)

# Usage

First install dependencies

```sh
  npm i
```

Then run `index.js` with node

```sh
  node index.js
```

or with npm

```sh
  npm start
```


## Running in Amazon Lambda

First package script zip with the following npm command

```sh
  npm run package
```

Create a lambda with runtime Node.js 6.10 or grater and folowing handler `lambda.handler`. Note it will execute only once, so you will have to use a timed trigger to execute it eventually.
