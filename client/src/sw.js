/*
 *  Service worker installed to server first time
 *  This is the modular code to define the cache our application apis
 */
//Dexie is used to save and fetch the data from the IndexedDB.
import Dexie from "dexie";
const { assets } = global.serviceWorkerOption;

let webpackAssets = [...assets, "./"];

//configuration for the post data
let postData = {};
//Creating the database for the offline
const db = new Dexie("offline");
db.version(1).stores({
  postrequest: "++id,url,data"
});

// assetsToCache = assetsToCache.map(path => {//
//   return new URL(path, global.location).toString();
// });

const staticCacheName = "site-static-v1";
const dynamicCacheName = "dynamic-site-v1";
// const otherAssets = [
//   "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
//   "https://use.fontawesome.com/releases/v5.5.0/css/all.css",
//   "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css",
//   "https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800",
//   "assets/css/nucleo-icons.css",
//   "https://use.fontawesome.com/releases/v5.0.6/css/all.css",
//   "assets/css/blk-design-system.min.css",
//   "/assets/img/Preloader.gif",
//   "https://code.jquery.com/jquery-3.3.1.min.js",
//   "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
//   "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
//   "assets/js/blk-design-system.min.js",
//   "fallback.html",
//   "assets/fonts/nucleo.ttf",
//   "assets/fonts/nucleo.woff",
//   "assets/fonts/nucleo.woff2"
// ];
let totalCache = [...webpackAssets];
console.log("SEflish====>", self);

/*
 * Limiting the size of the cache not to blot the cache browser memory
 */
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", evt => {
  console.log("Service worker is installed", totalCache);
  self.skipWaiting().then(function() {
    self.clients.claim();
    //This clients to ensure that the underlying service worker take effect immediately for both current client and all other active clients
  }); // skip waiting //but why
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log("Caching all asstes");
      cache
        .addAll(totalCache)
        .then(cached => {
          console.log("all assests cached");
        })
        .catch(err => {
          console.log("Eror", err);
          throw new Error(err);
        });
    })
  );
});

//Activate the service worker here
//This section is used to perform action after activation
//action such as deleting cache
//Now afte the activatio of the service worker we are deleting the old cache name and provide only the current cache there waiting for what turn down for what

self.addEventListener("activate", evt => {
  console.log("Service Worker has been activated");
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

/*
 * Function to save the data to the indexedDB
 */
function saveDataToIndexedDB(evt, postData) {
  console.log("POSTDATA", postData);
  //Saving the request to the database
  db.postrequest
    .add({
      url: evt.request.url,
      data: postData
    })
    .then(datares => {
      // console.log("datares===>", postData);
      return postData;
    })
    .catch(err => {
      console.log("Post Request saving database failed");
      throw new Error(err);
    });
}

/*
 * Fetching the events for the service workers
 * This is used to get the response for cache or the apis
 * check if the resource are in cache if not the request based on the caching of the route
 */

self.addEventListener("fetch", evt => {
  console.log("EVENTS===>", evt);
  // console.log("checkStatus", checkStatus());
  // console.log("window.navigator.onLine;", navigator.onLine);
  // console.log("Fetch Events", evt, evt.request.context);

  // if (navigator.onLine) {
  //::Checking from the database to fetch the data  and send it to the backend

  //Call the evt respond funcitonality to send data when the application came to online
  /*
   * We get the data when the application become online, then also return from the cache and also send it back
   */
  if (evt.request.mode === "navigate") {
    evt.respondWith(caches.match("/index.html"));
  }

  /*
   * Check if the database is empty or not in the database
   * If not empty then request to the database to send the data back
   * then continue to fetch the data but
   */

  if (evt.request.method !== "POST") {
    evt.respondWith(
      caches
        .match(evt.request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(evt.request).then(fetchRes => {
              return caches.open(dynamicCacheName).then(cache => {
                //Here we update the cache and clone the respose of the request then return the respose
                return cache.put(evt.request.url, fetchRes.clone()).then(() => {
                  limitCacheSize(dynamicCacheName, 75);
                  return fetchRes;
                });
              });
            })
          );
        })
        .catch(() => {})
    );
  } else {
    /*
     * Caching the post request on indexDatabase and send it when online
     * Not relying on navigator.onLine as it shows false connection status
     * So trying to send the set the index database in the catch functionality
     * Add the data of post to the database or send message to show data will be updated
     * when connection is online
     */

    //To check if the app is online or not
    //If error in requesting means offline
    //and save in database in catch
    console.log("chceck if", evt.request.clone().hasOwnProperty("text"));
    let postData = {};
    fetch(evt.request.clone())
      .then(fetchRes => {
        return fetchRes;
      })
      .catch(() => {
        //  Getting the post request method
        //Using clone in the event request is used as without clone the body stream lock error will
        // thrown and can't copy request more than once

        //Checking the post data
        console.log("POST------------>Data", evt.request.url);
        //Check if it is not login functionality
        if (evt.request.url.indexOf("/login") === -1) {
          evt.request
            .clone()
            .text()
            .then(function(body) {
              //To check if the form is form-data or just form
              if (body.indexOf("form-data") > -1) {
                evt.request
                  .clone()
                  .formData()
                  .then(formData => {
                    // var form_data = new FormData();
                    let form_data = { formType: "form-data" };
                    for (var pair of formData.entries()) {
                      console.log("KEY", pair[0], "Value", pair[1]);
                      form_data[pair[0]] = pair[1];
                    }
                    postData = form_data;
                    saveDataToIndexedDB(evt, postData);
                    console.log("POSTDATA", postData);
                  });
              } else {
                postData = JSON.parse(body);
                saveDataToIndexedDB(evt, postData);
              }
            });
        }
      });
  }
});

// const checkStatus = function() {
//   let status = navigator.onLine ? "online" : "offline";
//   return status;
// };

// self.addEventListener("online", () => {
//   console.log(
//     "OFFLINE=============================================================",
//     checkStatus()
//   );
// });
