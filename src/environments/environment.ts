// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyDlnj7dL9GFdjQ5agXI_Oza1WIbDsOzr8w",
    authDomain: "projeto-exemplo-34cbd.firebaseapp.com",
    databaseURL: "https://projeto-exemplo-34cbd-default-rtdb.firebaseio.com",
    projectId: "projeto-exemplo-34cbd",
    storageBucket: "projeto-exemplo-34cbd.firebasestorage.app",
    messagingSenderId: "814182306995",
    appId: "1:814182306995:web:89bf2fe44dd60a77be4cc6"
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

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

export const firebaseConfig = environment.firebaseConfig;
