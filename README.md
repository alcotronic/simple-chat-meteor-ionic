# Simple chat with Meteor and Ionic 3

This is a little chat app, inspired by the whatsapp tutorial from angular-meteor. This project uses the RdisOplog meteor project so a redis server is needed.

angular.io - https://angular.io

meteor - https://www.meteor.com/

angular-meteor - https://angular-meteor.com

Meteor Client Bundler - https://github.com/Urigo/meteor-client-bundler

ionic - https://ionicframework.com

meteor and ionic tutorial - https://steemit.com/utopian-io/@jaysermendez/setting-up-ionic-3-with-meteorjs-backend

RedisOplog for meteor
https://github.com/cult-of-coders/redis-oplog

## Usage

### Install meteor

Follow installation instructions for meteor:

https://www.meteor.com/install

### Install ionic cli and cordova client

Open a terminal and run:

```
npm install -g ionic cordova
```

### Install Meteor Client Bundler

Open a terminal and run:

```
npm install -g meteor-client-bundler
```

### Install dependencies

Open a terminal in the project folder and install npm dependencies with:

```
npm install
```

### Configuration

Set the "DDP_DEFAULT_CONNECTION_URL" variable in bundler.config.json to your needs - mostly for local testing the ip/hostname of your machine.

Set the variables for your redis server as needed in the meteor settings file that is located here: src/api/private/settings.json


### Create client bundle
Open a terminal in the project folder and
```
npm run meteor-client:bundle
```

### Run

You need to start both, ionic serve for the app and meteor for the api.

In one terminal in the project folder start the app with:

```
npm run ionic:serve:lab
```
As an alternative you can run the app on an android emulator or device. Check Ionic documentation for dependencies installation like android-sdk. Keep in mind that you have to set your hostname/ip in the settings files so that your emulator or device can connect correctly.

```
npm run ionic:emulator:android
```
```
npm run ionic:device:android
```

In a second terminal in the project folder start meteor with:

```
npm run meteor
```
