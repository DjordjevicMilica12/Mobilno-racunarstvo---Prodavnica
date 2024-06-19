// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   firebaseAPIKey:'AIzaSyCdoohMSQFxzss3DxSfYPPoen18bJRvSy4'
// };

export const environment = {
  production: false,
  firebaseConfig: {
    firebaseAPIKey: 'AIzaSyCdoohMSQFxzss3DxSfYPPoen18bJRvSy4',
    authDomain: 'prodavnica-mob-rac.firebaseapp.com',
    databaseURL: 'https://prodavnica-mob-rac-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'prodavnica-mob-rac',
    storageBucket: 'prodavnica-mob-rac.appspot.com',
    messagingSenderId: '922801498229', 
    appId: '1:922801498229:web:abcdef123456' 
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  