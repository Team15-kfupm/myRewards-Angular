// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  useEmulators: true,
  firebase: {
    projectId: 'myrewards-e3b0c',
    appId: '1:654852290280:web:0cacefc7e8c8a4c382bb5d',
    databaseURL: 'https://myrewards-e3b0c-default-rtdb.firebaseio.com',
    storageBucket: 'myrewards-e3b0c.appspot.com',
    apiKey: 'AIzaSyA6tW6VcbPNJXh0Fx4V2sI9-1pHJYSM_T0',
    authDomain: 'myrewards-e3b0c.firebaseapp.com',
    messagingSenderId: '654852290280',
    measurementId: 'G-V50G22SLVG',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
