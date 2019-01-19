# A bank statement analyser

An application for analysing spending patterns from a bank statement

## Installation

To install dependencies:
```
npm i
```

To run the application:
```
npm start
```

## Development

The easiest way to develop this application is by running 2 processes simultaneously:
```
npm run build-assets:watch
npm run server:watch
```

You can do this concurrently (in one terminal window) with:
```
npm run dev
```

* Then enter the test data into the DB:
```
npm run stub-data
```

=======
## Tests

To run the tests you will need docker installed and available via the command line.
It will be used to automatically start external test dependencies like mongo and selenium.
You can install docker using this command
```
curl https://get.docker.com | bash
```

You can run the tests with a simple command:
```
npm test
```

## License

There is no license for this project.
