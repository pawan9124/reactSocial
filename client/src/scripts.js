import Dexie from "dexie";
import Axios from "axios";

var db = new Dexie("offline");
let status = "";
let counter = 0;
const checkStatus = function() {
  status = navigator.onLine ? "online" : "offline";
  return status;
};

const sendPostRequest = reqData => {
  console.log("REQUESTDAT", reqData);
  return new Promise((resolve, reject) => {
    Axios.post("/api" + reqData.url.split("/api")[1], reqData.data)
      .then(result => {
        db.open()
          .then(database => {
            database
              .table("postrequest")
              .delete(reqData.id)
              .then(delData => {
                resolve("Data Uploaded and Deleted");
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

window.addEventListener("online", function() {
  console.log("Status====", checkStatus());
  // console.log("Dexie.isOpen()=====>", Dexie.isOpen());
  db.open()
    .then(database => {
      console.log("DB", database);
      database
        .table("postrequest")
        .toArray()
        .then(dbData => {
          console.log("DBDatat---->", dbData);
          if (dbData.length > 0) {
            for (let i = 0; i < dbData.length; i++) {
              if (dbData[i].data.formType === "form-data") {
                let newForm = new FormData();
                for (let dt in dbData[i].data) {
                  newForm.append(dt, dbData[i].data[dt]);
                }
                dbData[i].data = newForm;
              }
              sendPostRequest(dbData[i])
                .then(console.log("Uploaded Successfully"))
                .catch(err => {
                  console.log("ERRR__Upload", err);
                });
            }
          }
        });
    })
    .catch(error => {
      console.error(error);
    });
});

window.addEventListener("offline", function() {
  console.log("Status====", checkStatus());
});
