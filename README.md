# The One API SDK

The library provides convenient access to the The One API.

## Documentation

See [The One API docs](https://the-one-api.dev/documentation).

## Requirements

Node 18 or higher.

## Installation

Install the package with:

```bash
npm i jhonatan-sdk
```

## Configuration

The package needs to be configured with your account's access token, which is available at [your account page](https://the-one-api.dev/account):

```javascript
import { TheOneApiClient } from 'jhonatan-sdk';

const client = new TheOneApiClient({ accessToken: 'your access token...' });
```

## Usage

After configuring the client you can use it like this:

```javascript
client
  .listMovies()
  .then((resource) => {
    const movies = resource.docs;
    console.log(movies);
  })
  .catch((error) => console.error(error));
```

You can paginate through records using the `page` parameter:

```javascript
client
  .listQuotes({ page: 2 })
  .then((resource) => {
    const quotes = resource.docs;
    console.log(quotes);
  })
  .catch((error) => console.error(error));
```

## Development

### Compiling the library

You can compile the library with the following command:

```bash
npm run build
```

### Linting the source files

ESLint is being used with Prettier to keep the coding style and you can fix any styling
issues with the following command:

```bash
npm run lint
```

### Running the tests

You can run the tests with the following command:

```bash
npm test
```

If you want to verify the test coverage you can use the following command:

```bash
npm run test:cov
```

### Cleaning up

The following command removes temporary files and folders that are used in other processes.

```bash
npm run clean
```
