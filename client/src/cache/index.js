import { object } from "prop-types";

//Create an instanc of a db object for us to store the open database in

let db;

//Function to open a database for the desktop page
export const createDatabase = (databaseName, tablename, uniqueKey) => {
  console.log(
    "databaseName",
    databaseName,
    "tablename",
    tablename,
    "uniqueKey",
    uniqueKey
  );
  return new Promise((resolve, reject) => {
    //Open the database; it is created if it doesn't already exists
    let request = window.indexedDB.open(databaseName, 1);

    //onerror handler signifies that the database didn't open
    request.onerror = () => {
      console.log("Database failed to open");
      reject("Database failed to open!!");
    };

    //onsuccess handler signifies that the database opened successfully
    request.onsuccess = () => {
      console.log("Database opened successfully");

      //retun the database result to a variable.
      db = request.result;
      resolve(request);
    };

    //Setup the database tables if this has not already been  done
    request.onupgradeneeded = e => {
      //Grab a reference to the opened database
      let dbd = e.target.result;

      //Create an objectStore to store our notest in (basically a single table)
      dbd.createObjectStore(tablename, {
        keyPath: uniqueKey,
        autoIncrement: true
      });

      // objectStore.createIndex("mp4", "mp4", { unique: false });

      console.log("Database setup compelete");
    };
  });
};

//Create table inside the database with data
export const createTableAndRow = (request, tablename, data) => {
  console.log("resuel====>", tablename, data);
  return new Promise((resolve, reject) => {
    try {
      let db = request.result;
      //Setup the database tables if this has not already been done
      let objectStore = db
        .transaction([tablename], "readwrite")
        .objectStore(tablename);
      let recorded = objectStore.add(data);

      recorded.onsuccess = () => {
        console.log("Record addition attempt finished");
        resolve("Row Index created");
      };
      recorded.onerror = () => {
        console.log(recorded.error);
      };
    } catch (error) {
      console.log("error===>", error);
      reject(error);
    }
  });
};

export const fetchTableAndRow = (tablename, id) => {
  new Promise((resolve, reject) => {});
};

//load the database on the window on load function
window.onload = () => {};
