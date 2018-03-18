# A bank statement analyser

An application for analysing spending patterns from a bank statement

## Installation

To run the application:
```
npm i
npm run build-assets
npm start
```

## Development

The easiest way to develop this application is by running 2 processes:

* First install dependencies:
```
npm i
```

* Then enter the test data into the DB:
```
npm run stub-data
```

* In one terminal start webpack with a watch (so changes in the UI are live-updated):
```
npm run build-assets:watch
```

* In the second terminal window start the server:
```
npm run server:watch
```

## License

There is no license for this project.
