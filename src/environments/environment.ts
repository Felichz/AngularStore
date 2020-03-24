// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  product_api_url: 'https://platzi-store.herokuapp.com/products/',
  firebase: {
    apiKey: 'AIzaSyDYh2ZFLBB2ShS1gydD4MDqHP2t1oMyHCc',
    authDomain: 'angularstore-c2cfc.firebaseapp.com',
    databaseURL: 'https://angularstore-c2cfc.firebaseio.com',
    projectId: 'angularstore-c2cfc',
    storageBucket: 'angularstore-c2cfc.appspot.com',
    messagingSenderId: '720187451145',
    appId: '1:720187451145:web:fcfc846b61e8dd9d8d15d8'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
