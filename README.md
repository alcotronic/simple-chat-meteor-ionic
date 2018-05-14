# Simple chat with Meteor and Ionic 3

This is a little chat app, inspired by the whatsapp tutorial from angular-meteor. This project uses the RdisOplog meteor project so a redis server is needed.

angular.io - https://angular.io

meteor - https://www.meteor.com/

angular-meteor - https://angular-meteor.com

ionic - https://ionicframework.com

meteor and ionic tutorial - https://steemit.com/utopian-io/@jaysermendez/setting-up-ionic-3-with-meteorjs-backend

RedisOplog for meteor
https://github.com/cult-of-coders/redis-oplog

## Usage

### Install dependencies

```
npm install
```

### Configuration

Set the "DDP_DEFAULT_CONNECTION_URL" variable in bundler.config.json to your needs - mostly for local testing the ip/hostname of your machine.

Set the variables for your redis server as needed in the meteor settings file that is located here: src/api/private/settings.json


### Create client bundle
```
npm run meteor-client:bundle
```

### Run

You need to start both, ionic serve for the app and meteor for the api.

In one terminal in the project folder start the app with:

```
npm ionic:serve:lab
```

In a second terminal in the project folder start meteor with:

```
npm meteor
```
